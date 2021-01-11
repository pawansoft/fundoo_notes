import React, { Component } from 'react'
import {
    View,
    Image,
    FlatList
} from 'react-native'
import { Appbar} from 'react-native-paper'
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService'
import backgroundImageStyle from '../../../Style/backgroundImageStyle'
import dashboardStyle from '../../../Style/dashboardStyle'
import NoteCard from '../DashboardScreen/NoteCard'

export default class ArchiveScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listView: true,
            notesFromSQLite: [],
            index: 0,
            endReached : false,
            showNotes: []
        }
    }

    async componentDidMount() {
        await SQLiteCRUDService.getConditionalDetailsFromSQLiteDatabase("true", "false")
            .then(async (data) => {
                var temp = []
                if (data.rows.length != 0) {
                    for (let i = 0; i < data.rows.length; ++i)
                        temp.push(data.rows.item(i));
                    await this.setState({
                        notesFromSQLite: temp
                    })
                }
            }
        )
        let tempNotes = []
            let loadingIndex
            for(loadingIndex = 0; loadingIndex < 10 && loadingIndex < this.state.notesFromSQLite.length; loadingIndex++){
                tempNotes.push(this.state.notesFromSQLite[loadingIndex])
            }
            await this.setState({
                showNotes : tempNotes,
                index : loadingIndex
            })
    }

    selectView = async () => {
        await this.setState({
            listView: !this.state.listView
        })
        console.log(this.state.listView);
    }

    updateNote = (key, title, note, labels) => {
        this.props.navigation.push('NewNotes',
            { key: key, title: title, note: note, selectedLabel: labels,  updateNote: true})
    }

    handleSearch = () => {
        this.props.navigation.push('Home', { screen: 'Search'})
    }


    loadData = async (addIndex) => {
        for(let i = 0; i < addIndex; i++) {
            if(this.state.index == this.state.notesFromSQLite.length) {
                await this.setState({
                    index: 0,
                })
            }
            this.state.showNotes.push(this.state.notesFromSQLite[this.state.index])
            this.state.index ++
        }
    }

    render() {
        return (
            <View>
                 <Image style = { backgroundImageStyle.backgroundImage } source = {require('../../../assets/background1.jpg')}>
                </Image> 
                <Appbar style = {dashboardStyle.headerContainer}>
                    <Appbar.Action
                        icon = 'menu'
                        onPress = {() => this.props.navigation.openDrawer()} />

                    <Appbar.Content title = "Archive" />
                    <Appbar.Action icon = 'magnify' 
                    onPress = {this.handleSearch}/>

                    <Appbar.Action
                        style = {{ marginRight: 10 }}
                        icon = {(this.state.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                        onPress = {this.selectView} />
                </Appbar>
                <FlatList
                    numColumns = {this.state.listView ? 1 : 2}
                    keyExtractor = {(item, index) => JSON.stringify(index)}
                    key = {this.state.listView ? 1 : 2}
                    data = {this.state.showNotes}
                    onEndReached = {async () => {
                        await this.setState({
                            endReached : true
                        })
                    }}
                    onScroll = {async () => {
                        if(this.state.endReached){
                            this.loadData(5)
                            await this.setState({
                                endReached : false
                            })
                        }
                    }}

                    onEndReachedThreshold = {0.1}
                    renderItem = {({item}) => (
                        <NoteCard
                            listView = {this.state.listView}
                            notes = {item}
                            noteKey = {item.note_id}
                            isArchive = {'true'}
                            navigation = {this.props.navigation}/>   
                    )}
                    />
            </View>
        )
    }
}
import React, { Component } from 'react';
import{
    FlatList,
    Image,
    View
} from 'react-native';
import { Appbar } from 'react-native-paper';
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService';
import backgroundImageStyle from '../../../Style/backgroundImageStyle';
import dashboardStyle from '../../../Style/dashboardStyle';
import BottomBar from '../DashboardScreen/dashboardFooter';
import NoteCard from '../DashboardScreen/NoteCard';

export default class Reminder extends Component{
    constructor(props){
        super(props);
        this.state = {
            listView: true,
            notesFromSQLite: [],
        }
    }

    componentDidMount = async() => {
        await SQLiteCRUDService.getConditionalDetailsFromSQLiteDatabase("false", "false")
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
    }

    selectView = async () => {
        await this.setState({
            listView: !this.state.listView
        })
    }

    handleSearch = () => {
        this.props.navigation.push('Home', { screen: 'Search' })
    }
    render(){
        return(
            <View style = {{flex:1}}>
                <Image style = { backgroundImageStyle.backgroundImage } source = {require('../../../assets/background1.jpg')}>
                </Image> 
                <Appbar style = {dashboardStyle.headerContainer}>
                    <Appbar.Action
                        icon = 'menu'
                        onPress = {() => this.props.navigation.openDrawer()} />

                    <Appbar.Content title = "Reminder" />
                    <Appbar.Action icon = 'magnify' 
                    onPress = {this.handleSearch}/>

                    <Appbar.Action
                        style = {{ marginRight: 10 }}
                        icon = {(this.state.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                        onPress = {this.selectView} />
                </Appbar>
                <View>
                <View>
                    <FlatList
                    style = {{marginBottom : '30%'}}
                        numColumns = {this.props.listView ? 1 : 2}
                        keyExtractor = {(item, index) => JSON.stringify(index)}
                        key = {this.props.listView ? 1 : 2}
                        data = {this.state.notesFromSQLite}
                        onEndReached = {async () => {
                            await this.setState({
                                endReached: true
                            })
                        }}
                        onEndReachedThreshold = {0.1}
                            renderItem = {({ item }) => (
                                (item.Reminder != null && item.Reminder != undefined && item.Reminder != '' )?
                            <NoteCard
                                listView = {this.state.listView}
                                notes = {item}
                                noteKey = {item.note_id}
                                isArchive = {true}
                                navigation = {this.props.navigation} />
                            :null
                            )}
                         />
                    </View>

                </View>

                <View style = {dashboardStyle.footer}>
                    <BottomBar  navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}
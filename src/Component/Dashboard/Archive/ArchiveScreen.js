import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Appbar, Card, Paragraph, Title } from 'react-native-paper'
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService'
import dashboardStyle from '../../../Style/dashboardStyle'
import NotesContainerStyle from '../../../Style/NotesContainerStyle'

export default class ArchiveScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listView: true,
            notesFromSQLite: []
        }
    }

    async componentDidMount() {
        await SQLiteCRUDService.getDetailsFromSQLiteDatabase()
            .then(async (data) => {
                var temp = []
                if (data.rows.length != 0) {
                    for (let i = 0; i < data.rows.length; ++i)
                        temp.push(data.rows.item(i));
                    await this.setState({
                        notesFromSQLite: temp
                    })
                }
            })
    }

    selectView = async () => {
        await this.setState({
            listView: !this.state.listView
        })
        console.log(this.state.listView);
    }

    updateNote = (key, title, note) => {
        this.props.navigation.push('NewNotes',
            { key: key, title: title, note: note })
    }

    handleSearch = () => {
        this.props.navigation.push('Home', { screen: 'Search'})
    }

    render() {
        return (
            <View>
                <Appbar style={dashboardStyle.headerContainer}>
                    <Appbar.Action
                        icon='menu'
                        onPress={() => this.props.navigation.openDrawer()} />

                    <Appbar.Content title="Archive" />
                    <Appbar.Action icon='magnify' 
                    onPress = {this.handleSearch}/>

                    <Appbar.Action
                        style={{ marginRight: 10 }}
                        icon={(this.state.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                        onPress={this.selectView} />
                </Appbar>

                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.state.notesFromSQLite.reverse().map(val => (
                            <React.Fragment key={val.NoteKey}>
                                {console.log(val)}
                                {val.isDeleted == "false" && val.isArchive == "true" ?
                                    (<Card
                                        onPress={() => this.updateNote(val.NoteKey, val.Title, val.Notes)}
                                        style={(this.state.listView) ? NotesContainerStyle.container_list : NotesContainerStyle.container}>
                                        <Card.Content style={{ backgroundColor: 'white' }}>
                                            <Title style={{ color: 'black' }}>
                                                {val.Title}
                                            </Title>
                                            <Paragraph style={{ color: 'black' }}>
                                                {val.Notes}
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>)
                                    : null}
                            </React.Fragment>
                        ))
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}
import React, { Component } from 'react';
import {
    View,
    ScrollView,
} from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
import NotesContainerStyle from '../../../Style/NotesContainerStyle';
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService';

export default class NotesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
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

    updateNote = (key, title, note) => {
        this.props.navigation.push('NewNotes',
            { key: key, title: title, note: note })
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.state.notesFromSQLite.reverse().map(val => (                   
                            <React.Fragment key={val.NoteKey}>
                                {console.log(val.Notes)}
                                {val.isDeleted == "false" && val.isArchive == "false"?
                                    (
                                        <Card
                                            onPress={() => this.updateNote(val.NoteKey, val.Title, val.Notes)}
                                            style={(this.props.listview) ? NotesContainerStyle.container_list : NotesContainerStyle.container}>
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


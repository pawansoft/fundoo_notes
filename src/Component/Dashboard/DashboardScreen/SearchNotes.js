import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import {
    TextInput,
    View
} from 'react-native'
import { Appbar, Card, Paragraph, Title } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import Highlighter from 'react-native-highlight-words';
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService'
import searchNoteStyle from '../../../Style/searchNotestyle'

export default class SearchNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            usersFilterdNotes: [],
            text: '',
            foundArchive : false
        }
    }

    componentDidMount = async () => {
        await SQLiteCRUDService.getDetailsFromSQLiteDatabase()
            .then(async (data) => {
                var temp = []
                if (data.rows.length != 0) {
                    for (let i = 0; i < data.rows.length; ++i)
                        temp.push(data.rows.item(i));
                    await this.setState({
                        notes: temp
                    })
                }
            })
    }

    searchUserText = async (text) => {
        let temArray = []
        for (let i = 0; i < this.state.notes.length; ++i) {
            if (this.state.notes[i].Title.toLowerCase().includes(text.toLowerCase()) && text != '' || this.state.notes[i].Notes.toLowerCase().includes(text.toLowerCase()) && text != '') {
                temArray.push(this.state.notes[i])
            }
        }
        await this.setState({
            usersFilterdNotes: temArray,
            text: text
        })
    }

    handleUpdateNote = (key, title, note) => {
        this.props.navigation.push('NewNotes', {
            key: key,
            note: note, title: title
        })
    }

    handleBackButton = () => {
        this.props.navigation.push('Home', { screen: 'Notes' })
    }

    render() {
        return (
            <View>
                <Appbar style={searchNoteStyle.headerContainer}>
                    <Appbar.Action
                        icon='keyboard-backspace'
                        onPress={this.handleBackButton} />
                    <TextInput
                        autoFocus={true}
                        placeholder={'Search Your Notes'}
                        onChangeText={this.searchUserText}
                    />
                </Appbar>
                <ScrollView>
                    <View>
                        {this.state.usersFilterdNotes.map(val => (
                            <React.Fragment key={val.NoteKey}>
                                {val.isDeleted == "false" ? (
                                    <Card
                                        style={searchNoteStyle.container_list}
                                        onPress={() => this.handleUpdateNote(val.NoteKey, val.Title, val.Notes)
                                        }>
                                        <Card.Content>
                                            <Title>
                                                <Highlighter
                                                    highlightStyle={{ backgroundColor: 'yellow' }}
                                                    searchWords={[this.state.text]}
                                                    textToHighlight={val.Title} />
                                            </Title>
                                            <Paragraph>
                                                <Highlighter
                                                    highlightStyle={{ backgroundColor: 'yellow' }}
                                                    searchWords={[this.state.text]}
                                                    textToHighlight={val.Notes} />
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>)
                                    : null}
                            </React.Fragment>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
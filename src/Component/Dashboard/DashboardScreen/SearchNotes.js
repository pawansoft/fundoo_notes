import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import {
    Image,
    Text,
    TextInput,
    View
} from 'react-native'
import { Appbar, Card, Chip, Paragraph, Title } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import Highlighter from 'react-native-highlight-words';
import searchNoteStyle from '../../../Style/searchNotestyle'
import backgroundImageStyle from '../../../Style/backgroundImageStyle'
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService'
import SQLiteLabelServices from '../../../../Services/SQLite_service/SQLiteLabelServices'
import NotesContainerStyle from '../../../Style/NotesContainerStyle'
import NotesHolderStyle from '../../../Style/NotesHolderStyle'
import moment from "moment";

export default class SearchNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            usersFilterdNotes: [],
            text: '',
            foundArchive: false,
            labelDetails: []
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

        await SQLiteLabelServices.selectLabelFromSQliteStorage()
            .then(async result => {
                var temp = [];
                if (result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    this.setState({
                        labelDetails: temp
                    })
                }
            })
    }

    searchUserText = async (text) => {
        let temArray = []
        for (let i = 0; i < this.state.notes.length; ++i) {
            if (this.state.notes[i].Title != null) {
                if (this.state.notes[i].Notes != null) {
                    if (this.state.notes[i].Title.toLowerCase().includes(text.toLowerCase()) && text != '' || this.state.notes[i].Notes.toLowerCase().includes(text.toLowerCase()) && text != '') {
                        temArray.push(this.state.notes[i])
                    }
                }
            }
        }
        await this.setState({
            usersFilterdNotes: temArray,
            text: text
        })
    }

    handleUpdateNote = (key, title, note, labels, reminder, isArchive) => {
        this.props.navigation.push('NewNotes', {
            //key: key, title: title, note: note, selectedLabel: labels, updateNote: true
            key: key,
            note: note, title: title,
            selectedLabel: labels,
            updateNote: true,
            SelectedLabels: labels,
            isArchive: isArchive,
            reminder: reminder
        })
    }

    handleBackButton = () => {
        this.props.navigation.push('Home', { screen: 'Notes' })
    }

    render() {
        return (
            <View>
                <Image style={backgroundImageStyle.backgroundImage} source={require('../../../assets/background1.jpg')}>
                </Image>
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
                <ScrollView >
                    <View style={{ marginBottom: '30%' }}>
                        {this.state.usersFilterdNotes.map(val => (
                            <React.Fragment key={val.NoteKey}>
                                {val.isDeleted == "false" ? (
                                    <Card
                                        style={searchNoteStyle.container_list}
                                        onPress={() => this.handleUpdateNote(val.NoteKey, val.Title, val.Notes, val.Labels, val.Reminder, val.isArchive)
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
                                            <View style={NotesHolderStyle.label_text_container}>
                                            {
                                                (val.Reminder != undefined) ?
                                                    <Chip
                                                        icon='alarm'
                                                        style = {{ backgroundColor: '#e6b800', width: 142}}>
                                                        {moment(JSON.parse(val.Reminder)).format('D MMM, h.mm a')}
                                                    </Chip>
                                                : null}
                                            </View>
                                            <View style={NotesHolderStyle.label_text_container}>
                                                {(val.Labels != undefined) ?
                                                    this.state.labelDetails.map(data =>
                                                        val.Labels.includes(data.label_id) ?
                                                            <React.Fragment key={data.label_id}>
                                                                <Text style={NotesHolderStyle.label_text}>{data.label}</Text>
                                                            </React.Fragment>
                                                            : null

                                                    ) : null}
                                            </View>
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
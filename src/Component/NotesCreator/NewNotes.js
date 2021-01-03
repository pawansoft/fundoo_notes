import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ScrollView,
    TextInput,
    View
} from 'react-native';
import { Appbar, Menu, Snackbar } from 'react-native-paper';
import Textarea from 'react-native-textarea';
import FirebaseService from '../../../Services/firebase_services/NoteServices';
import NotesHolderStyle from '../../Style/NotesHolderStyle';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons'
import NoteServices from '../../../Services/firebase_services/NoteServices';
import SQLiteCRUDService from '../../../Services/SQLite_service/SQLiteCRUDService';
import NotesContainerStyle from '../../Style/NotesContainerStyle';

import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'fundoo_notes.db' });

export default class NewNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            note: '',
            key: '',
            userid: '',
            isEmpty: false
        }
        db.transaction(transect => {
            transect.executeSql(
                'select * from Notes',
                [],
                (results) => {
                    console.log(results);
                },
                error => console.log(error)
            );
        });
    }

    componentDidMount = async () => {
        const userId = await AsyncStorage.getItem('userId');
        await this.setState({
            userid: userId
        })

        if (this.props.route.params != undefined) {
            console.log('inrender method');
            console.log(this.props.route.params.notes);
            await this.setState({
                key: this.props.route.params.key,
                note: this.props.route.params.notes.NotesDetail.note,
                title: this.props.route.params.notes.NotesDetail.title
            })
            console.log(this.state.key);
        }
    }

    handleTitle = async (title) => {
        await this.setState({
            title: title
        })
        console.log(this.state.title);
    }

    handleNote = async (note) => {
        await this.setState({
            note: note
        })
        console.log(this.state.note);
    }

    handleBackButton = async () => {
        if (this.state.title != '' || this.state.note != '') {
            if (this.props.route.params != undefined) {
                FirebaseService._updateNoteService(this.state.userid, this.state.key, this.state.title, this.state.note)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
                    .catch(error => console.log(error))
            }
            else if (this.props.route.params == undefined) {
                SQLiteCRUDService.storeNoteToDB(this.state.userid, this.state.title, this.state.note, 'false')
                .then(() => console.log('success'))
                .catch(error => console.log(error))
                FirebaseService._storeNoteService(this.state.userid, this.state.title, this.state.note)
                    .then(() => this.props.navigation.push('Home', {screen: 'Notes'}))
                    .catch(error => console.log(error))
            }
        }
        else {
            this.props.navigation.push('Home', { screen: 'Notes', params: { isEmpty: true } })
        }
    }

    handleDeleteNoteButton = async () => {
        if (this.state.title != '' || this.state.note != '') {
            NoteServices._deleteNotesService(this.state.userid, this.state.key, this.state.title, this.state.note)
                .then(() => this.props.navigation.push('Home', { screen: 'Notes', params:{ isDeleted: true,
                                                    key: this.state.key,
                                                    title: this.state.title,
                                                    note: this.state.note,
                                                    userid: this.state.userid}}))
                .catch(error => console.log(error))
        }
        else {
            await this.setState({
                isEmpty: true
            })
        }
    }

    handleRBSheetOpenButton = async () => {
        this.RBSheet.open();
    }

    onDismissSnakbarHandler = async () => {
        this.setState({
            isEmpty: false
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <Appbar style={NotesHolderStyle.headerContainer}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-around" }}>
                        <Appbar.Action
                            icon='keyboard-backspace'
                            onPress={this.handleBackButton}
                        />

                        <Appbar.Action
                            icon='pin-outline'
                        />

                        <Appbar.Action
                            icon='bell-plus-outline'
                        />

                        <Appbar.Action
                            icon='archive-arrow-down-outline'
                        />
                    </View>
                </Appbar>

                <ScrollView>
                    <View style={NotesHolderStyle.Title}>
                        <TextInput
                            style={NotesHolderStyle.TitleFont}
                            placeholder='Title'
                            value={this.state.title}
                            onChangeText={this.handleTitle} />
                    </View>
                    <View style={NotesHolderStyle.Note}>
                        <Textarea
                            placeholder='Notes'
                            value={this.state.note}
                            onChangeText={this.handleNote} />
                    </View>
                </ScrollView>
                <Appbar style={NotesHolderStyle.footerContainer}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-around"}}>
                        <Appbar.Action
                            icon='plus-box-outline' />

                        <Appbar.Action
                            icon='undo-variant' />

                        <Appbar.Action
                            icon='redo-variant' />

                        <Appbar.Action
                            icon='dots-vertical'
                            onPress={this.handleRBSheetOpenButton} />
                    </View>
                </Appbar>
                <RBSheet
                    ref={ref => { this.RBSheet = ref }}
                    height={250}
                    customStyles={{
                        container: {
                            marginBottom: 50,
                            borderTopWidth: 1,
                            borderColor: "#d3d3d3",

                        },
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                    }}>
                    <View >
                        <Menu.Item icon="delete-outline" title="Delete"
                        style = {NotesContainerStyle.snakbarButton}
                            onPress={this.handleDeleteNoteButton} />
                        <Menu.Item icon="content-copy" title="Make a copy" />
                        <Menu.Item icon="share-variant" title="Send" />
                        <Menu.Item
                            icon={({ size, color }) => (
                                <Icon name="person-add-outline" size={size} color={color} />
                            )}
                            title="Collaborator" />
                        <Menu.Item icon="label-outline" title="Labels" />
                    </View>
                </RBSheet>
                <Snackbar
                    style={{ marginBottom: 100 }}
                    visible={this.state.isEmpty}
                    onDismiss={this.onDismissSnakbarHandler}
                    duration={10000}>
                    Empty notes can not be deleted
                </Snackbar>

            </View>
        )
    }
}
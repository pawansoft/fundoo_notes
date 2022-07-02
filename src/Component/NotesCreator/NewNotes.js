import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ScrollView,
    TextInput,
    View,
    Image,
    Text
} from 'react-native';
import Textarea from 'react-native-textarea';
import NotesHolderStyle from '../../Style/NotesHolderStyle';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons'
import NotesContainerStyle from '../../Style/NotesContainerStyle';
import { openDatabase } from 'react-native-sqlite-storage';
// import NotesServiceController from '../../../Services/data_flow_controller/NotesServiceController';
import backgroundImageStyle from '../../Style/backgroundImageStyle';
import SQLiteLabelServices from '../../../Services/SQLite_service/SQLiteLabelServices';
import ProfileStyle from '../../Style/ProfileStyle';
import SelectDateAndTime from '../Dashboard/Reminder/SelectDateAndTime';
import { Appbar, Chip, Menu, Modal, Portal, Provider, Snackbar } from 'react-native-paper';
import moment from "moment";
// import firebase_rest_service from '../../../Services/firebase_services/firebase_rest_service';

const db = openDatabase({ name: 'fundoo_notes.db', createFromLocation: '~data/fundoo_notes.db' });

export default class NewNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            note: '',
            key: '',
            userid: '',
            isEmpty: false,
            SelectedLabels: [],
            reminder: '',
            labelDetails: [],
            availableNoteKeys: [],
            noteKey: [],
            openDateTimePicker: false,
            isArchive: false,
            date: '',
            mode: 'date',
            show: false,
            errorDate: false
        }
    }

    componentDidMount = async () => {
        const userId = await AsyncStorage.getItem('userId');
        await this.setState({
            userid: userId
        })

        if (this.props.route.params.newNote == true) {
            if (this.props.route.params.note != null || this.props.route.params.title != null) {
                var temp = [];
                const newKey = new Date()
                temp.push(newKey)
                await this.setState({
                    note: this.props.route.params.note,
                    title: this.props.route.params.title,
                    SelectedLabels: this.props.route.params.selectedLabel,
                    labelDetails: this.props.route.params.available_labels,
                    key: newKey,
                    noteKey: temp,
                    reminder: JSON.parse(this.props.route.params.reminder)
                })
            }

        }
        else if (this.props.route.params.updateNote == true) {
            var temp = [];
            temp.push(this.props.route.params.key)
            await this.setState({
                noteKey: temp,
                key: this.props.route.params.key,
                note: this.props.route.params.note,
                title: this.props.route.params.title,
                SelectedLabels: JSON.parse(this.props.route.params.selectedLabel),
                isArchive: this.props.route.params.isArchive,
                reminder: JSON.parse(this.props.route.params.reminder)
            })
        }
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
            .catch(error => console.log(error))
    }
    //storeNoteIdIntoLabels

    handleTitle = async (title) => {
        await this.setState({
            title: title
        })
    }

    handleNote = async (note) => {
        await this.setState({
            note: note
        })
    }

    handleBackButton = async () => {
        if (this.state.title != '' || this.state.note != '') {
            if (this.props.route.params.newNote == true) {
                // await NotesServiceController.addNote(this.state.key, this.state.title, this.state.note, JSON.stringify(this.state.SelectedLabels), JSON.stringify(this.state.reminder), 'false', 'false')
                //     .then(() => this.props.navigation.push('Home', { screen: 'Notes' }))
                //     .catch(error => console.log(error))

                // this.updateNoteIdIntoLabel()
            }
            else if (this.props.route.params.updateNote == true) {
                // await NotesServiceController.updateNote(this.state.key, this.state.title, this.state.note, JSON.stringify(this.state.SelectedLabels), JSON.stringify(this.state.reminder))
                //     .then(() => this.props.navigation.push('Home', { screen: 'Notes' }))
                //     .catch(error => console.log(error))

                // this.updateNoteIdIntoLabel()
            }
        }
        else {
            this.props.navigation.push('Home', { screen: 'Notes', params: { isEmpty: true } })
        }
    }

    handleArchiveButton = async () => {
        if (this.state.title != '' || this.state.note != '') {
            if (this.props.route.params.updateNote == true) {
                // NotesServiceController.restoreArchive(this.state.key, this.state.title, this.state.note, JSON.stringify(this.state.SelectedLabels), JSON.stringify(this.state.reminder))
                //     .then(() => this.props.navigation.push('Home', {
                //         screen: 'Notes', params: {
                //             key: this.state.key,
                //             userid: this.state.userid,
                //             title: this.state.title,
                //             note: this.state.note,
                //             labels: this.state.SelectedLabels,
                //             isArchived: true,
                //             reminder: this.state.reminder
                //         }
                //     }))
            }
            else {
                // NotesServiceController.addArchive(this.state.title, this.state.note, JSON.stringify(this.state.SelectedLabels), JSON.stringify(this.state.reminder))
                //     .then(() => this.props.navigation.push('Home', {
                //         screen: 'Notes', params: {
                //             key: this.state.key,
                //             userid: this.state.userid,
                //             title: this.state.title,
                //             note: this.state.note,
                //             labels: this.state.SelectedLabels,
                //             isArchived: true,
                //             reminder: this.state.reminder
                //         }
                //     }))
            }

        }
        else {
            this.props.navigation.push('Home', { screen: 'Notes', params: { isEmpty: true } })
        }
    }

    handleUnArchiveButton = async () => {
        console.log(JSON.stringify(this.state.SelectedLabels));
        if (this.state.title != '' || this.state.note != '') {
            // NotesServiceController.removeArchive(this.state.key, this.state.title, this.state.note, JSON.stringify(this.state.SelectedLabels), JSON.stringify(this.state.reminder))
            //     .then(() => this.props.navigation.push('Home', { screen: 'Notes' }))
            //     .catch(error => console.log(error))
        }
        else {
            this.props.navigation.push('Home', { screen: 'Notes', params: { isEmpty: true } })
        }
    }
    handleCancel = () => {
        const { onPress } = this.props
        this.RBSheet.close()
    }

    handleSelectLabel = () => {
        this.handleCancel()
        if (this.props.route.params.newNote == true) {
            this.props.navigation.push('Home', { screen: 'SelectLabel', params: { newNote: true, title: this.state.title, note: this.state.note, label: this.state.SelectedLabels, reminder: JSON.stringify(this.state.reminder) } })
        }
        if (this.props.route.params.updateNote == true) {
            this.props.navigation.push('Home', {
                screen: 'SelectLabel', params: {
                    key: this.state.key, title: this.state.title, note: this.state.note, SelectedLabels: this.state.SelectedLabels, updateNote: true, reminder: JSON.stringify(this.state.reminder)
                }
            })
        }
    }

    handleDeleteNoteButton = async () => {
        this.handleCancel()
        if (this.state.title != '' || this.state.note != '') {
            console.log("from delete"+JSON.stringify(this.state.SelectedLabels));
            // NotesServiceController.moveToRecycleBin(this.state.key, this.state.title, this.state.note, JSON.stringify(this.state.SelectedLabels))
            //     .then(() => this.props.navigation.push('Home', {
            //         screen: 'Notes', params: {
            //             key: this.state.key,
            //             userid: this.state.userid,
            //             title: this.state.title,
            //             note: this.state.note,
            //             labels: this.state.SelectedLabels,
            //             isDeleted: true
            //         }
            //     }))
            //     .catch(error => console.log(error))
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

    updateNoteIdIntoLabel = () => {
        let noteId;
        if (this.state.SelectedLabels.length > 0) {
            this.state.labelDetails.map(label => {
                if (this.state.SelectedLabels.includes(label.label_id)) {
                    noteId = JSON.parse(label.NoteKey);
                    if (noteId != null && noteId != 0) {
                        if (!noteId.includes(this.state.key)) {
                            noteId.push(this.state.key)
                            // NotesServiceController.updateNoteIdInLabel(JSON.stringify(noteId), label.label_id, label.label)
                            //     .then(() => console.log('updated Successfully'))
                        }
                    }
                    else {
                        // NotesServiceController.updateNoteIdInLabel(JSON.stringify(this.state.noteKey), label.label_id, label.label)
                        //     .then(() => console.log("updated"))
                    }

                }
                else {
                    noteId = JSON.parse(label.NoteKey)
                    if (noteId != null) {
                        if (noteId.includes(this.state.key)) {
                            let index = noteId.indexOf(this.state.key)
                            noteId.splice(index, 1)
                            // NotesServiceController.updateNoteIdInLabel(JSON.stringify(noteId), label.label_id, label.label)
                            //     .then(() => console.log('index removed successfully'))
                        }
                    }

                }
            })
        } else {
            this.state.labelDetails.map(label => {
                noteId = JSON.parse(label.NoteKey);
                if (noteId != null) {
                    if (noteId.includes(this.state.key)) {
                        let index = noteId.indexOf(this.state.key)
                        noteId.splice(index, 1)
                        // NotesServiceController.updateNoteIdInLabel(JSON.stringify(noteId), label.label_id, label.label)
                        //     .then(() => console.log('updated all label'))
                    }
                }

            })
        }
    }

    closeDateTimePicker = async () => {
        let today = new Date();
        today.setHours(today.getHours() + 3);
        await this.setState({
            date: today,
            openDateTimePicker: false,
            errorDate: false
        })
    }

    handleReminderIconButton = async () => {
        if (this.state.reminder != '') {
            await this.setState({
                date: new Date(this.state.reminder)
            })
        }
        else if (this.state.reminder == '') {
            await this.setState({
                date: new Date()
                
            })
        }
        await this.setState({
            openDateTimePicker: true,
        })
    }

    handleDateChange = async (event, selectedDate) => {
        let now = new Date()
        var selected = new Date(selectedDate)
        if (now.getTime() > selected.getTime()) {
            await this.setState({
                errorDate: true
            })
        } else {
            await this.setState({
                errorDate: false
            })
        }
        if (event.type != 'dismissed') {
            await this.setState({
                date: selectedDate,
                show: false
            })
        } else {
            await this.setState({
                show: false
            })
        }
    }

    saveChoosenTime = async () => {
        if (!this.state.errorDate) {
            await this.setState({
                reminder: this.state.date,
                openDateTimePicker: false,
                errorDate: false
            })
        }
    }

    showMode = async (currentMode) => {
        
        await this.setState({
            show: true,
            mode: currentMode
        })
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    showTimepicker = () => {
        this.showMode('time');
    };

    handleDeleteReminderButton = async () => {
        let today = new Date();
        today.setHours(today.getHours() + 4);
        today.setMinutes(0)
        await this.setState({
            date: today,
            reminder: '',
            openDateTimePicker: false,
            errorDate: false
        })
    }

    render() {
        return (
            <Provider>
                <View style={{ flex: 1 }}>
                    <Image style={backgroundImageStyle.backgroundImage} source={require('../../assets/background1.jpg')}>
                    </Image>

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
                                onPress={this.handleReminderIconButton}
                            />

                            <Appbar.Action
                                icon={(this.state.isArchive == 'true') ? 'archive-arrow-up-outline' : 'archive-arrow-down-outline'}
                                onPress={(this.state.isArchive == 'true') ? this.handleUnArchiveButton : this.handleArchiveButton}
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
                        <View style={NotesHolderStyle.label_text_container1}>
                            {
                                (this.state.reminder != '') ?
                                    <Chip
                                        icon='alarm'
                                        onPress={this.handleReminderIconButton}
                                        style={{ backgroundColor: '#e6b800' }}>
                                        {moment(this.state.reminder).format('D MMM, h.mm a')}
                                    </Chip>
                                    : null
                            }
                        </View>
                        <View style={NotesHolderStyle.label_text_container1}>
                            {(this.state.SelectedLabels != undefined) ?
                                this.state.labelDetails.map(data =>
                                    this.state.SelectedLabels.includes(data.label_id) ?
                                        <React.Fragment key={data.label}>
                                            <Text style={NotesHolderStyle.label_text}>{data.label}</Text>
                                        </React.Fragment>
                                        : null
                                )
                                : null
                            }
                        </View>
                    </ScrollView>
                    <Appbar style={NotesHolderStyle.footerContainer}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-around" }}>
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
                        height={300}
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
                        <View>
                            <Menu.Item icon="delete-outline" title="Delete"
                                style={NotesContainerStyle.menu}
                                onPress={this.handleDeleteNoteButton} />
                            <Menu.Item icon="content-copy" title="Make a copy" style={NotesContainerStyle.menu} />
                            <Menu.Item icon="share-variant" title="Send" style={NotesContainerStyle.menu} />
                            <Menu.Item
                                style={NotesContainerStyle.menu}
                                icon={({ size, color }) => (
                                    <Icon name="person-add-outline" size={size} color={color} />
                                )}
                                title="Collaborator" />
                            <Menu.Item icon="label-outline" title="Labels"
                                onPress={this.handleSelectLabel}
                                style={NotesContainerStyle.menu} />
                        </View>
                    </RBSheet>
                    <Snackbar
                        style={{ marginBottom: 100 }}
                        visible={this.state.isEmpty}
                        onDismiss={this.onDismissSnakbarHandler}
                        duration={10000}>
                        Empty notes can not be deleted
                </Snackbar>
                    <Portal>
                        <Modal
                            visible={this.state.openDateTimePicker}
                            onDismiss={this.closeDateTimePicker}
                            contentContainerStyle={ProfileStyle.container}>
                            <SelectDateAndTime
                                dismissModal={this.closeDateTimePicker}
                                date={this.state.date}
                                show={this.state.show}
                                changeDate={this.handleDateChange}
                                mode={this.state.mode}
                                showDatepicker={this.showDatepicker}
                                showTimepicker={this.showTimepicker}
                                saveReminder={this.saveChoosenTime}
                                reminder={this.state.reminder}
                                deleteReminder={this.handleDeleteReminderButton}
                                errorDate={this.state.errorDate} />
                        </Modal>
                    </Portal>
                </View>
            </Provider>
        )
    }
}
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
import NotesServiceController from '../../../Services/data_flow_controller/NotesServiceController';
import backgroundImageStyle from '../../Style/backgroundImageStyle';
import SQLiteLabelServices from '../../../Services/SQLite_service/SQLiteLabelServices';

import ProfileStyle from '../../Style/ProfileStyle';
import SelectDateAndTime from '../Dashboard/Reminder/SelectDateAndTime';
import { Appbar, Menu, Modal, Portal, Provider, Snackbar } from 'react-native-paper';

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
            labelDetails: [],
            ShoowTimeSelector: false,
            isArchive: false
        }
    }

    componentDidMount = async () => {
        const userId = await AsyncStorage.getItem('userId');
        await this.setState({
            userid: userId
        })

        if (this.props.route.params.newNote == true) {
            if (this.props.route.params.note != null || this.props.route.params.title != null) {
                await this.setState({
                    note: this.props.route.params.note,
                    title: this.props.route.params.title,
                    SelectedLabels: this.props.route.params.selectedLabel,
                    labelDetails: this.props.route.params.available_labels
                })
            }

        }
        else if (this.props.route.params.updateNote == true) {
            console.log('in update block');
            await this.setState({
                key: this.props.route.params.key,
                note: this.props.route.params.note,
                title: this.props.route.params.title,
                SelectedLabels: JSON.parse(this.props.route.params.selectedLabel),
                isArchive: this.props.route.params.isArchive
            })
        }
        console.log(this.state.isArchive);
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
                await NotesServiceController.addNote(this.state.title, this.state.note, JSON.stringify(this.state.SelectedLabels))
                    .then(() => this.props.navigation.push('Home', { screen: 'Notes' }))
                    .catch(error => console.log(error))
            }
            else if (this.props.route.params.updateNote == true) {
                await NotesServiceController.updateNote(this.state.key, this.state.title, this.state.note, JSON.stringify(this.state.SelectedLabels))
                    .then(() => {
                        this.props.navigation.push('Home', { screen: 'Notes' })
                    }).catch(error => console.log(error))

            }
        }
        else {
            this.props.navigation.push('Home', { screen: 'Notes', params: { isEmpty: true } })
        }
    }

    handleArchiveButton = async () => {
        if (this.state.title != '' || this.state.note != '') {
            NotesServiceController.addArchive(this.state.title, this.state.note, JSON.stringify(this.state.SelectedLabels))
                .then(() => this.props.navigation.push('Home', {
                    screen: 'Notes', params: {
                        key: this.state.key,
                        userid: this.state.userid,
                        title: this.state.title,
                        note: this.state.note,
                        labels: this.state.SelectedLabels,
                        isArchived: true
                    }
                }))
        }
        else {
            this.props.navigation.push('Home', { screen: 'Notes', params: { isEmpty: true } })
        }
    }

    handleUnArchiveButton = async () => {
        if (this.state.title != '' || this.state.note != '') {
            NotesServiceController.removeArchive(this.state.key, this.state.title, this.state.note, this.state.SelectedLabels)
                .then(() => this.props.navigation.push('Home', { screen: 'Notes' }))
                .catch(error => console.log(error))
        }
        else {
            this.props.navigation.push('Home', { screen: 'Notes', params: { isEmpty: true } })
        }
    }
    handleCancel = () => {
        const { onPress } = this.props
        this.RBSheet.close()
        //onPress();
    }
    handleSelectLabel = () => {
        this.handleCancel()
        if (this.props.route.params.newNote == true) {
            this.props.navigation.push('Home', { screen: 'SelectLabel', params: { newNote: true, title: this.state.title, note: this.state.note, label: this.state.SelectedLabels } })
        }
        if (this.props.route.params.updateNote == true) {
            this.props.navigation.push('Home', {
                screen: 'SelectLabel', params: {
                    key: this.state.key, title: this.state.title, note: this.state.note, SelectedLabels: this.state.SelectedLabels, updateNote: true
                }
            })
        }
        // this.props.navigation.push('Home', {screen: 'SelectLabel', params: {noteKey : this.state.key, note: this.state.note, title: this.state.title, label: this.state.labels, userid : this.state.userid}})
    }

    handleDeleteNoteButton = async () => {
        this.handleCancel()
        if (this.state.title != '' || this.state.note != '') {
            NotesServiceController.moveToRecycleBin(this.state.key, this.state.title, this.state.note, JSON.stringify(this.state.SelectedLabels))
                .then(() => this.props.navigation.push('Home', {
                    screen: 'Notes', params: {
                        key: this.state.key,
                        userid: this.state.userid,
                        title: this.state.title,
                        note: this.state.note,
                        labels: this.state.SelectedLabels,
                        isDeleted: true
                    }
                }))
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

    hideTimeSelector = async () => {
        await this.setState({
            ShoowTimeSelector: false
        })
    }
    showTimeSelector = async () => {
        await this.setState({
            ShoowTimeSelector: true
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
                                onPress={this.showTimeSelector}
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
                        <View style = {NotesHolderStyle.label_text_container}>
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
                            visible={this.state.ShoowTimeSelector}
                            onDismiss={this.hideTimeSelector}
                            contentContainerStyle={ProfileStyle.container}>
                            <SelectDateAndTime navigation={this.props.navigation} />

                        </Modal>
                    </Portal>

                </View>
            </Provider>
        )
    }
}
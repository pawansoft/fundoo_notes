import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    Text,
    View
} from 'react-native';
import { Appbar, Button, Menu, Snackbar } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotesHolderStyle from '../../../Style/NotesHolderStyle';
import NotesServiceController from '../../../../Services/data_flow_controller/NotesServiceController';
import backgroundImageStyle from '../../../Style/backgroundImageStyle';
import SQLiteLabelServices from '../../../../Services/SQLite_service/SQLiteLabelServices';
import NotesContainerStyle from '../../../Style/NotesContainerStyle';
import Datalayr from '../../../../Services/Datalayer/Datalayr';

export class DeleteActionScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            note: '',
            key: '',
            userid: '',
            isDeletable: false,
            selectedLabel: [],
            labelDetails: []
        }
    }

    componentDidMount = async () => {
        const userId = await AsyncStorage.getItem('userId')
        await this.setState({
            userid: userId
        })

        if (this.props.route.params != undefined) {
            console.log(this.state.key);
            await this.setState({
                key: this.props.route.params.notes.NoteKey,
                note: this.props.route.params.notes.Notes,
                title: this.props.route.params.notes.Title,
                selectedLabel: this.props.route.params.notes.Labels
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
    }

    handleRBSheetOpenButton = async () => {
        this.RBSheet.open();
    }

    handleRestoreService = () => {
        Datalayr.handleRestoreNote(this.props.route.params.notes.NoteKey)
        this.props.navigation.push('Home', { screen: 'Delete' })
    }

    handleDeleteNoteForEver = () => {
        this.handleCancel();
        Datalayr.DeleteNoteService(this.state.key)
        this.props.navigation.push('Home', { screen: 'Delete' })

    }

    handleRBSheetOpenButton = async () => {
        this.RBSheet.open();
    }

    onDismissSnakbarHandler = async () => {
        await this.setState({
            isDeletable: false
        })
    }

    handleOpenSnakBar = async () => {
        await this.setState({
            isDeletable: true
        })
    }

    restoreNotesHandler = () => {
        this.handleCancel();
        Datalayr.handleRestoreNote(this.props.route.params.notes.NoteKey)
        this.props.navigation.push('Home', { screen: 'Notes' })
    }
    handleCancel = () => {
        const { onPress } = this.props
        this.RBSheet.close()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image style={backgroundImageStyle.backgroundImage} source={require('../../../assets/background1.jpg')}>
                </Image>
                <Appbar style={{ backgroundColor: 'white', width: '20%' }}>
                    <Appbar.Action
                        icon='keyboard-backspace'
                        onPress={() => this.props.navigation.push('Home', { screen: 'Delete' })}
                    />
                </Appbar>
                <ScrollView>
                    <View style={NotesHolderStyle.Title}>
                        <Text style={NotesHolderStyle.TitleFont}
                            onPress={this.handleOpenSnakBar}>
                            {this.state.title}
                        </Text>
                    </View>
                    <View style={NotesHolderStyle.Title}>
                        <Text>
                            {this.state.note}
                        </Text>
                    </View>
                    <View style={NotesHolderStyle.label_text_container}>
                        {(this.state.selectedLabel != undefined) ?
                            this.state.labelDetails.map(data =>
                                this.state.selectedLabel.includes(data.label_id) ?
                                    <React.Fragment key={data.label_id}>
                                        <Text style={NotesHolderStyle.label_text}>{data.label}</Text>
                                    </React.Fragment>
                                    : null

                            ) : null}
                    </View>
                </ScrollView>
                <View>
                    <Appbar style={{ backgroundColor: 'white', justifyContent: 'space-around' }}>
                        <Appbar.Action
                            icon='plus-box-outline' />
                        <Appbar.Action
                            title='Deleted note' />
                        <Appbar.Action
                            icon='dots-vertical'
                            onPress={this.handleRBSheetOpenButton} />
                    </Appbar>
                </View>
                <RBSheet
                    ref={ref => { this.RBSheet = ref }}
                    height={200}
                    customStyles={{
                        container: {
                            borderTopWidth: 1,
                            borderColor: "#d3d3d3",
                            marginBottom: 50
                        },
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                    }}>
                    <View style={{ marginTop: '10%' }}>
                        <Menu.Item
                            icon='autorenew'
                            onPress={this.handleRestoreService}
                            title=' Restore' />
                        <Menu.Item
                            title='Delete forever'
                            icon='delete-outline'
                            onPress={this.handleDeleteNoteForEver} />

                    </View>
                </RBSheet>
                <Snackbar
                    style={{ marginBottom: '30%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'grey' }}

                    visible={this.state.isDeletable}
                    onDismiss={this.onDismissSnakbarHandler}
                    duration={5000}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            <Text style={{ marginTop: 10, color: 'white' }}>
                                Note Deleted Successfully
                            </Text>
                        </View>

                        <View style={{ marginLeft: 50 }}>
                            <Button
                                onPress={this.restoreNotesHandler}>
                                <Text style={{ color: '#cca300' }}>Restore</Text>
                            </Button>
                        </View>
                    </View>
                </Snackbar>
            </View>
        )
    }
}
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseService from '../../../../Services/firebase_services/NoteServices';
import { Card, Paragraph, Title, Provider, Appbar, Button } from 'react-native-paper';
import NotesContainerStyle from '../../../Style/NotesContainerStyle';
import dashboardStyle from '../../../Style/dashboardStyle';
import RBSheet from 'react-native-raw-bottom-sheet';
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService';

export default class Delete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listView: true,
            notes: [],
            notesFromSQLite: [],
            showProfileScreen: false,
            isEditable: false
        }
    }

    showProfile = async () => {
        await this.setState({
            showProfileScreen: true
        })
    }

    hideProfile = async () => {
        await this.setState({
            showProfileScreen: false
        })
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
        const userid = await AsyncStorage.getItem('userId');
        await FirebaseService._getNoteService(userid).then(async data => {
            let notes = data ? data : {}

            await this.setState({
                notes: notes
            })
        })
    }

    selectView = async () => {
        await this.setState({
            listView: !this.state.listView
        })
    }

    showDeleteSnackbar = async () => {
        if (this.props.route.params != undefined) {
            if (this.props.route.params.isEmpty != undefined) {
                await this.setState({
                    showEmptyNoteSnackbar: true
                })
            }
        }
    }

    handleRBSheetOpenButton = async () => {
        this.RBSheet.open();
    }

    handleCancel = () => {
        const { onPress } = this.props
        this.RBSheet.close()
        //onPress();
    }

    deleteNoteActionHandler = (key) => {
        this.props.navigation.navigate('DeleteAction',
            { key: key, notes: this.state.notes[key] })
    }

    render() {
        return (
            <Provider>
                <View style={{ flex: 1 }}>
                    <View>
                        <Appbar style={dashboardStyle.headerContainer}>
                            <Appbar.Action
                                icon='menu'
                                onPress={() => this.props.navigation.openDrawer()} />
                            <Text>Deleted Notes</Text>
                            <Appbar.Action
                                icon='dots-vertical'
                                style={{ marginRight: 10 }}
                                onPress={this.handleRBSheetOpenButton} />
                        </Appbar>
                    </View>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {this.state.notesFromSQLite.reverse().map(val => (
                                    <React.Fragment key={val.NoteKey}>
                                        {val.isDeleted == "true" && val.isArchive == "false" ?
                                            (<Card
                                                onPress={() => this.deleteNoteActionHandler(val.NoteKey)}
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
                    <RBSheet
                        ref={ref => { this.RBSheet = ref }}
                        height={100}
                        customStyles={{
                            container: {
                                borderTopWidth: 1,
                                borderColor: "#d3d3d3",
                            },
                            wrapper: {
                                backgroundColor: "transparent",
                            },
                        }}>
                        <View style={{ width: '80%', marginLeft: '10%', marginTop: '10%', borderRadius: 10 }}>
                            <Button
                                icon='delete-outline'>
                                <Text style={{ color: 'Red', fontWeight: 'bold', fontSize: 18 }}>
                                    Clean Recycle bin
                            </Text>
                            </Button>
                        </View>
                    </RBSheet>
                </View>
            </Provider>
        )
    }
}
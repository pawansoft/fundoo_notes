import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';
import BottomBar from './dashboardFooter';
import DashboardHeader from './DashboardHeader';
import { Portal, Snackbar, Modal, Provider, Button, Appbar } from 'react-native-paper';
import Profile from '../Profile';
import ProfileStyle from '../../../Style/ProfileStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseService from '../../../../Services/firebase_services/NoteServices';
import NotesServiceController from '../../../../Services/data_flow_controller/NotesServiceController';
import backgroundImageStyle from '../../../Style/backgroundImageStyle';
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService';
import NoteCard from './NoteCard';
import dashboardStyle from '../../../Style/dashboardStyle';
import { NativeModules } from 'react-native';
const { CalendarModule } = NativeModules;

class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            showEmptyNoteSnackbar: false,
            showDeleteNoteSnackbar: false,
            showArchivedSnackbar: false,
            showDelete: false,
            showProfileScreen: false,
            notes: [],
            textToSearch: '',
            notesFromSQLite: [],
            index: 0,
            endReached: false,
            showNotes: []
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

        if (this.props.route.params != undefined) {
            if (this.props.route.params.isEmpty != undefined) {
                await this.setState({
                    showEmptyNoteSnackbar: true
                })
            }
            else if (this.props.route.params.isDeleted != undefined) {
                await this.setState({
                    showDeleteNoteSnackbar: true
                })
            }
            else if (this.props.route.params.isArchived != undefined) {
                await this.setState({
                    showArchivedSnackbar: true
                })
            }
        }
        const userid = await AsyncStorage.getItem('userId');
        await FirebaseService._getNoteService(userid).then(async data => {
            let notes = data ? data : {}

            await this.setState({
                notes: notes
            })
        })

        await SQLiteCRUDService.getConditionalDetailsFromSQLiteDatabase('false', 'false')
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
            let tempNotes = []
            let loadingIndex
            for(loadingIndex = 0; loadingIndex < 10 && loadingIndex < this.state.notesFromSQLite.length; loadingIndex++){
                tempNotes.push(this.state.notesFromSQLite[loadingIndex])
            }
            await this.setState({
                showNotes : tempNotes,
                index : loadingIndex
            })
    }

    restoreNotesHandler = () => {
        NotesServiceController.updateNote(this.props.route.params.key,
            this.props.route.params.title,
            this.props.route.params.note,
            JSON.stringify(this.props.route.params.labels))
            .then(() => {
                this.props.navigation.push('Home', { screen: 'Notes' })
            }).catch(error => console.log(error))
    }

    restoreArchived = () => {
        NotesServiceController.removeArchive(this.props.route.params.key, 
                                            this.props.route.params.title, 
                                            this.props.route.params.note, 
                                            this.props.route.params.labels)

            .then(() => this.props.navigation.push('Home', { screen: 'Notes' }))
            .catch(error => console.log(error))
    }

    snakbarHandler = async () => {
        await this.setState({
            showEmptyNoteSnackbar: false
        })
        this.props.navigation.setParams({ isEmptyNote: false })
    }

    deleteSnakbarHandler = async () => {
        await this.setState({
            showDeleteNoteSnackbar: false
        })
        this.props.navigation.setParams({ isDeleteNote: false })
    }

    archivedSnakbarHandler = async () => {
        await this.setState({
            showArchivedSnackbar: false
        })
        this.props.navigation.setParams({ isArchived: false })
    }

    selectView = async () => {
        await this.setState({
            listView: !this.state.listView
        })
    }
    
    loadData = async (addIndex) => {
        for(let i = 0; i < addIndex; i++) {
            if(this.state.index == this.state.notesFromSQLite.length) {
                await this.setState({
                    index: 0,
                })
            }
            this.state.showNotes.push(this.state.notesFromSQLite[this.state.index])
           await this.setState({
               index : this.state.index + 1
           })
        }
    }

    render() {
        return (
            <Provider >

                <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: '#FAEBD7' }}>
                    <Image style={backgroundImageStyle.backgroundImage} source = {require('../../../assets/background1.jpg')}>
                    </Image>
                    <View>
                        <DashboardHeader navigation={this.props.navigation} onPress={this.selectView} listView={this.state.listView} onSelectProfile={this.showProfile} testToSearch={this.state.textToSearch} />
                    </View>
                    
                        <View>
                            <FlatList
                            style = {{marginBottom: '30%'}}
                                numColumns = {this.props.listView ? 1 : 2}
                                keyExtractor = {(item, index) => JSON.stringify(index)}
                                key = {this.props.listView ? 1 : 2}
                                data = {this.state.showNotes}
                                ListFooterComponent = {() => 
                                    (this.state.endReached)?
                                        <ActivityIndicator size="large" color="#00ff00"/>
                                    :null
                                }
                    
                                onEndReached = {async () => {
                                    await this.setState({
                                        endReached: true
                                    })
                                }}
                                onScroll = {async () => {
                                    if (this.state.endReached) {
                                        this.loadData(8)
                                        await this.setState({
                                            endReached: false,
                                        })
                                    }
                                }}

                                onEndReachedThreshold = {0.1}
                                renderItem = {({ item }) => (
                                    <NoteCard
                                        listView = {this.state.listView}
                                        notes = {item}
                                        noteKey = {item.note_id}
                                        isArchive = {true}
                                        navigation = {this.props.navigation} 
                                    />
                                )}
                            />
                        </View>

                    <View style = {dashboardStyle.footer}>
                        <BottomBar  navigation={this.props.navigation} />
                    </View>
                    <View>
                        <Snackbar
                            style = {{ marginBottom: '30%' }}
                            visible = {this.state.showEmptyNoteSnackbar}
                            onDismiss = {this.snakbarHandler}
                            duration = {10000}>
                            Empty Note Discarded
                        </Snackbar>
                        <Snackbar
                            style={{ marginBottom: '30%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'grey' }}
                            visible = {this.state.showDeleteNoteSnackbar}
                            onDismiss = {this.deleteSnakbarHandler}
                            duration = {1000}>
                            <View style = {{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View>
                                    <Text style = {{ marginTop: 10, color: 'white' }}>
                                        Note Deleted Successfully
                                </Text>
                                </View>
                                <View style = {{ marginLeft: 50 }}>
                                    <Button
                                        onPress = {this.restoreNotesHandler}>
                                        <Text style = {{ color: '#cca300' }}>UNDO</Text>
                                    </Button>
                                </View>
                            </View>
                        </Snackbar>

                        <Snackbar
                            style={{ marginBottom: '30%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'grey' }}
                            visible={this.state.showArchivedSnackbar}
                            onDismiss={this.archivedSnakbarHandler}
                            duration={10000}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View>
                                    <Text style={{ marginTop: 10, color: 'white' }}>
                                        Note added to archive
                                </Text>
                                </View>
                                <View style={{ marginLeft: 50 }}>
                                    <Button
                                        onPress={this.restoreNotesHandler}>
                                        <Text style={{ color: '#cca300' }}>RESTORE</Text>
                                    </Button>
                                </View>
                            </View>
                        </Snackbar>

                        <Portal>
                            <Modal
                                visible={this.state.showProfileScreen}
                                onDismiss={this.hideProfile}
                                contentContainerStyle={ProfileStyle.container}>
                                <Profile navigation={this.props.navigation} />
                            </Modal>
                        </Portal>
                    </View>
                </View>
            </Provider>
        )
    }
}

export default DashboardScreen;
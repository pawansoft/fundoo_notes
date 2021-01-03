import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
} from 'react-native';
import BottomBar from './dashboardFooter';
import DashboardHeader from './DashboardHeader';
import NotesContainer from './NotesContainer';
import { Portal, Snackbar, Modal, Provider, Button, Appbar} from 'react-native-paper';
import Profile from './Profile';
import ProfileStyle from '../../Style/ProfileStyle';
import NoteServices from '../../../Services/firebase_services/NoteServices';

class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            showEmptyNoteSnackbar: false,
            showDeleteNoteSnackbar:false,
            showDelete: false,
            showProfileScreen: false
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
            else if(this.props.route.params.isDeleted != undefined){
                await this.setState({
                    showDeleteNoteSnackbar: true
                })
            }
        }
    }

    restoreNotesHandler = () =>{
        NoteServices._restoreNoteService(this.props.route.params.userid, 
                                            this.props.route.params.key, 
                                            this.props.route.params.title,
                                            this.props.route.params.note).then(() =>{
                                                this.props.navigation.push('Home', {screen : 'Notes'})
                                            }).catch(error => console.log(error))

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

    selectView = async () => {
        await this.setState({
            listView: !this.state.listView
        })
    }


    render() {
        return (
            <Provider>
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <View>
                        <DashboardHeader navigation={this.props.navigation} onPress={this.selectView} listView={this.state.listView} onSelectProfile={this.showProfile} />
                    </View>
                    <ScrollView>
                        <View>
                            <NotesContainer navigation={this.props.navigation} listview={this.state.listView} />
                        </View>
                    </ScrollView>
                    <View>
                        <BottomBar navigation={this.props.navigation} />
                    </View>
                    <View>
                        <Snackbar
                            style={{ marginBottom: '30%' }}
                            visible={this.state.showEmptyNoteSnackbar}
                            onDismiss={this.snakbarHandler}
                            duration={10000}>
                            Empty Note Discarded
                        </Snackbar>
                        <Snackbar
                        style={{ marginBottom: '30%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'grey'}}
                            visible={this.state.showDeleteNoteSnackbar}
                            onDismiss={this.snakbarHandler}
                            duration={10000}>
                            <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View>
                                <Text style = {{marginTop: 10, color : 'white'}}>
                                    Note Deleted Successfully
                                </Text>
                            </View>
                            <View style = {{marginLeft: 50}}>
                                <Button
                                onPress = {this.restoreNotesHandler}>
                                    <Text style = {{color: '#cca300'}}>UNDO</Text>
                                </Button>
                            </View> 
                            </View>  
                        </Snackbar>
                        <Portal>
                            <Modal
                                visible={this.state.showProfileScreen}
                                onDismiss={this.hideProfile}
                                contentContainerStyle = {ProfileStyle.container}>
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
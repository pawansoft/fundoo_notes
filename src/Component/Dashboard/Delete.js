import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import BottomBar from './dashboardFooter';
import DashboardHeader from './DashboardHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseService from '../../../Services/firebase_services/NoteServices';
import { Card, Modal, Paragraph, Portal, Title, Provider } from 'react-native-paper';
import NotesContainerStyle from '../../Style/NotesContainerStyle';
import ProfileStyle from '../../Style/ProfileStyle';
import Profile from './Profile';

export default class Delete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listView: true,
            notes: [],
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
        console.log(this.state.listView);
    }

    showDeleteSnackbar = async() =>{
        if(this.props.route.params != undefined) {
            if(this.props.route.params.isEmpty != undefined) {
            await this.setState({
                showEmptyNoteSnackbar : true
            })
            }
        }
    }

    render() {
        let noteKey = Object.keys(this.state.notes);
        return (
            <Provider>
            <View style={{ flex: 1 }}>
                <View>
                    <DashboardHeader navigation={this.props.navigation} onPress={this.selectView} listView={this.state.listView} onSelectProfile={this.showProfile}/>
                </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {noteKey.length > 0 ?
                            noteKey.reverse().map(key => (
                                <React.Fragment key={key}>
                                    {this.state.notes[key].NotesDetail.isDeleted ?
                                        (<Card
                                            style={(this.state.listView) ? NotesContainerStyle.container_list : NotesContainerStyle.container}>
                                            <Card.Content style = {{backgroundColor: 'white'}}>
                                                <Title style = {{color: 'black'}}>
                                                    {this.state.notes[key].NotesDetail.title}
                                                </Title>
                                                <Paragraph style = {{color: 'black'}}>
                                                    {this.state.notes[key].NotesDetail.note}
                                                </Paragraph>
                                            </Card.Content>
                                        </Card>)
                                        : null}
                                </React.Fragment>
                            ))
                            :
                            null
                        }
                    </View>
                </ScrollView>
                <Portal>
                    <Modal
                        visible={this.state.showProfileScreen}
                        onDismiss={this.hideProfile}
                        contentContainerStyle = {ProfileStyle.container}>
                        <Profile navigation={this.props.navigation} />
                    </Modal>
                </Portal>
                <View >
                    <BottomBar navigation={this.props.navigation} />
                </View>

            </View>
            </Provider>
        )
    }
}
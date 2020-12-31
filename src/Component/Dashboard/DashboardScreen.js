import React, { Component } from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
import BottomBar from './dashboardFooter';
import DashboardHeader from './DashboardHeader';
import NotesContainer from './NotesContainer';
import { Portal, Snackbar, Modal, Provider} from 'react-native-paper';
import Profile from './Profile';
import ProfileStyle from '../../Style/ProfileStyle';

class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            showEmptyNoteSnackbar: false,
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
        }
    }

    snakbarHandler = async () => {
        await this.setState({
            showEmptyNoteSnackbar: false
        })
        this.props.navigation.setParams({ isEmptyNote: false })
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
                            duration={1000}>
                            Empty Note Discarded
                    </Snackbar>
                        {/* <Snackbar
                            style={{ marginBottom: '30%' }}
                            visible={this.state.showEmptyNoteSnackbar}
                            onDismiss={this.snakbarHandler}
                            duration={1000}>
                            Note Deleted Successfully
                    </Snackbar> */}
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
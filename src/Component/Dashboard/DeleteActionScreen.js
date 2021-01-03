import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import { Appbar, Button, Menu } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import dashboardStyle from '../../Style/dashboardStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotesHolderStyle from '../../Style/NotesHolderStyle';
import NoteServices from '../../../Services/firebase_services/NoteServices';

export class DeleteActionScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            note: '',
            key: '',
            userid: '',
            isEmpty: false
        }
    }

    componentDidMount = async () => {
        const userId = await AsyncStorage.getItem('userId')
        await this.setState({
            userid: userId
        })

        if (this.props.route.params != undefined) {
            await this.setState({
                key: this.props.route.params.key,
                note: this.props.route.params.notes.NotesDetail.note,
                title: this.props.route.params.notes.NotesDetail.title
            })
        }
    }
    handleRBSheetOpenButton = async () => {
        this.RBSheet.open();
    }

    handleRestoreService = () => {
        NoteServices._restoreNoteService(this.state.userid, this.state.key, this.state.title, this.state.note)
            .then(() => this.props.navigation.push('Home', { screen: 'Delete' }))
            .catch(error => console.log(error))
    }

    handleDeleteNoteForEver = () => {
        NoteServices._deleteOneNoteService(this.state.userid, this.state.key)
            .then(() => this.props.navigation.push('Home', { screen: 'Delete' }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar style={{ backgroundColor: 'white', width: '20%' }}>
                    <Appbar.Action
                        icon='keyboard-backspace'
                        onPress={() => this.props.navigation.push('Home', { screen: 'Delete' })}
                    />
                </Appbar>
                <ScrollView>
                    <View style={NotesHolderStyle.Title}>
                        <Text style={NotesHolderStyle.TitleFont}>
                            {this.state.title}
                        </Text>
                    </View>
                    <View style={NotesHolderStyle.Title}>
                        <Text>
                            {this.state.note}
                        </Text>
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
                        icon = 'autorenew'
                            onPress={this.handleRestoreService}
                            title = ' Restore'/>
                        <Menu.Item
                            title = 'Delete forever'
                            icon = 'delete-outline'
                            onPress={this.handleDeleteNoteForEver}/>
                            
                    </View>
                </RBSheet>
            </View>
        )
    }
}
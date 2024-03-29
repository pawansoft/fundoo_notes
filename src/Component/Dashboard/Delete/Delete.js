import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import FirebaseService from '../../../../Services/firebase_services/NoteServices';
import { Card, Paragraph, Title, Provider, Appbar, Button } from 'react-native-paper';
import NotesContainerStyle from '../../../Style/NotesContainerStyle';
import dashboardStyle from '../../../Style/dashboardStyle';
import RBSheet from 'react-native-raw-bottom-sheet';
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService';
import backgroundImageStyle from '../../../Style/backgroundImageStyle';
import SQLiteLabelServices from '../../../../Services/SQLite_service/SQLiteLabelServices';
import NotesHolderStyle from '../../../Style/NotesHolderStyle';
import Datalayr from '../../../../Services/Datalayer/Datalayr';

export default class Delete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listView: true,
            notesFromSQLite: [],
            showProfileScreen: false,
            isEditable: false,
            labelDetails: []
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
        this.setState({

            notesFromSQLite: Datalayr.getNoteByUserDelete()
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

    deleteNoteActionHandler = (value) => {
        this.props.navigation.navigate('DeleteAction',
            { notes: value })
    }

    render() {
        return (
            <Provider>
                <View style={{ flex: 1 }}>
                    <Image style={backgroundImageStyle.backgroundImage} source={require('../../../assets/background1.jpg')}>
                    </Image>
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
                                    <Card
                                        onPress={() => this.deleteNoteActionHandler(val)}
                                        style={NotesContainerStyle.container_list}>

                                        <Card.Content style={{ backgroundColor: 'white' }}>
                                            <Title style={{ color: 'black' }}>
                                                {val.Title}
                                            </Title>
                                            <Paragraph style={{ color: 'black' }}>
                                                {val.Notes}
                                            </Paragraph>
                                            <View style={NotesHolderStyle.label_text_container}>
                                                {(val.Labels != undefined) ?
                                                    this.state.labelDetails.map(data =>
                                                        val.Labels.includes(data.label_id) ?
                                                            <React.Fragment key={data.label_id}>
                                                                <Text style={NotesHolderStyle.label_text}>{data.label}</Text>
                                                            </React.Fragment>
                                                            : null
                                                    )
                                                    : null
                                                }
                                            </View>
                                        </Card.Content>
                                    </Card>
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
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
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
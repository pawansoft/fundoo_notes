import React, { Component } from 'react';
import {
    View,
    ScrollView,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseService from '../../../Services/firebase_services/NoteServices';
import { Card, Paragraph, Title } from 'react-native-paper'
import NotesContainerStyle from '../../Style/NotesContainerStyle';

export default class NotesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: []
        }
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

    updateNote = (key) => {
        this.props.navigation.push('NewNotes', 
        { key: key, notes: this.state.notes[key] })
    }

    render() {
        let noteKey = Object.keys(this.state.notes);
        return (
            <View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {noteKey.length > 0 ?
                            noteKey.reverse().map(key => (
                                <React.Fragment key={key}>
                                    {this.state.notes[key].NotesDetail.isDeleted == false ?
                                        (<Card
                                            onPress = {() => this.updateNote(key)}
                                            style={(this.props.listview) ? NotesContainerStyle.container_list : NotesContainerStyle.container}>
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
                            :null
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}
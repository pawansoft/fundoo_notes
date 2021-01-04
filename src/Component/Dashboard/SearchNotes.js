import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import{
    TextInput,
    View
} from 'react-native'
import { Appbar, Card, Paragraph, Searchbar, Title } from 'react-native-paper'
import dashboardStyle from '../../Style/dashboardStyle'
import FirebaseService from '../../../Services/firebase_services/NoteServices';
import { ScrollView } from 'react-native-gesture-handler'
import NotesContainerStyle from '../../Style/NotesContainerStyle'

export default class SearchNote extends Component{
    constructor(props){
        super(props)
        this.state = {
            notes: [],
            usersFilterdNotes : [],
            search: ''
        }
    }

    async componentDidMount() {
        const userid = await AsyncStorage.getItem('userId');
        await FirebaseService._getNoteService(userid).then(async data => {
            let notes = data ? data : {}

            await this.setState({
                notes: notes,
                usersFilterdNotes : notes
            })
        })
    }

   searchUserText =  async (search) =>{
        await this.setState({
            // usersFilterdNotes: this.state.notes.filter((data) => {
            //     data.title.includes(search)
            // })
            usersFilterdNotes: this.state.notes.title.includes(search)
        })

    }

    render(){
        let noteKey = Object.keys(this.state.usersFilterdNotes);
        return(
            <View>
            <View style = {{justifyContent : 'space-around'}}>
                <Appbar style={dashboardStyle.headerContainer}>
                    <Appbar.Action
                     icon='keyboard-backspace'
                     onPress={() => this.props.navigation.push('Home', { screen: 'Notes' })}
                    />
                    <TextInput
                    placeholder = 'Search your note'
                    style = {{width : '70%'}}
                        value = {this.state.search}
                    onChangeText = {this.searchUserText}/>
                </Appbar>
            </View>
            <View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {noteKey.length > 0 ?
                            noteKey.reverse().map(key => (
                                <React.Fragment key={key}>
                                    {this.state.usersFilterdNotes[key].NotesDetail.isDeleted == false ?
                                        (<Card  style ={{backgroundColor: 'white'}}
                                            onPress = {() => this.updateNote(key)}
                                            style={NotesContainerStyle.container_list}>
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
            </View>
        )
    }
}
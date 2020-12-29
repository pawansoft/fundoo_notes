import React,{ Component } from 'react';
import {
    View,
    Text, 
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { strings } from '../../Localization/Localization';
import RegisterStyle from '../../Style/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseService from '../../../Services/firebase_services/NoteServices';
import {Card, Paragraph, Title} from 'react-native-paper'
import NotesContainerStyle from '../../Style/NotesContainerStyle';

export default class NotesContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            notes : []
        }
    }

    async componentDidMount(){
        const userid = await AsyncStorage.getItem('userId');
        await FirebaseService._getNoteService(userid).then(async data => {
            let notes = data ? data: {}
            await this.setState({
                notes : notes
            })
        })
    }

    SigninInsteadNavigationHandler = () => {
        this.props.navigation.navigate('Login')
    }

    goToResponsiveWebsiteNavigationHandle = () => {
        this.props.navigation.navigate('ResponsiveImg')
    }

    updateNote = (key) => {
        this.props.navigation.push('NewNotes', { key : key, notes : this.state.notes[key]})
    }
    
    render(){
        let noteKey = Object.keys(this.state.notes);
        return(
            <View>               
                <ScrollView>
                    <View style = {{flexDirection : 'row', flexWrap : 'wrap'}}>
                        {noteKey.length > 0 ?
                            noteKey.reverse().map(key => (
                                <Card 
                                style = {(this.props.listview)? NotesContainerStyle.container_list : NotesContainerStyle.container}
                                key = {key}
                                onPress = {() => this.updateNote(key)}>   
                                  <Card.Content>
                                      <Title style = {NotesContainerStyle.container_title}>
                                          {this.state.notes[key].NotesDetail.title}
                                      </Title>
                
                                      <Paragraph>
                                          {this.state.notes[key].NotesDetail.title}
                                      </Paragraph>
                                     

                                  </Card.Content>  
                                </Card>
                            ))
                            
                            :null
                        }

                    </View>
                </ScrollView>
                <TouchableOpacity style = {RegisterStyle.touchable_opacity_style}
                    onPress = {this.SigninInsteadNavigationHandler}>
                        <Text style ={RegisterStyle.button_text}> 
                            {strings.signin}
                        </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
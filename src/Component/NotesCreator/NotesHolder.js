import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import{
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';
import { Appbar } from 'react-native-paper';
import Textarea from 'react-native-textarea';
import FirebaseService from '../../../Services/firebase_services/FirebaseService';
import NotesHolderStyle from '../../Style/NotesHolderStyle';

export default class NotesHolder extends Component{
    constructor(props){
        super(props)
        this.state = {
            title : '',
            note : '', 
            nullValueError : '',
        }
    }

    handleTitle = async(title) => {
        await this.setState({
            title : title
        })
        console.log(this.state.title);
    }

    handleNote = async(note) => {
        await this.setState({
            note : note
        })
        console.log(this.state.note);
    }

    handleBackButton = async() => {
        const userId = await AsyncStorage.getItem('userId');
        if(this.state.title != null && this.state.note !=null){
            FirebaseService._storeNoteService(userId, this.state.title, this.state.note)
            .then(() => this.props.navigation.navigate('Notes'))
            .catch(error => console.log(error))
        }else{
            console.log('Fill the details');
        }
        
    }

    render(){
        return(
            <View style = {{flex :1}}>
               
                <Appbar style = {NotesHolderStyle.headerContainer}>
                    <View style = {{flexDirection : 'row', width : '100%', justifyContent : "space-around"}}>
                        <Appbar.Action
                        icon = 'keyboard-backspace'
                        onPress = {this.handleBackButton}
                        />

                        <Appbar.Action
                        icon = 'pin-outline'
                        />

                        <Appbar.Action
                        icon = 'bell-plus-outline'
                        />

                        <Appbar.Action
                        icon = 'archive-arrow-down-outline'
                        />
                    </View>
                </Appbar>
              
                <ScrollView>
                    <View style = {NotesHolderStyle.Title}>
                        <TextInput 
                        style = {NotesHolderStyle.TitleFont}
                        onChangeText = {this.handleTitle}
                        placeholder = 'Title'/>
                    </View>
                    <View style = {NotesHolderStyle.Note}>
                        <Textarea
                        placeholder = 'Notes'
                        onChangeText = {this.handleNote}/>
                    </View>
                </ScrollView>
                <Appbar style = {NotesHolderStyle.footerContainer}>
                <View style = {{flexDirection : 'row', width : '100%', justifyContent : "space-around"}}>
                        <Appbar.Action
                        icon = 'plus-box-outline'/>

                        <Appbar.Action
                        icon = 'undo-variant'/>

                        <Appbar.Action
                        icon = 'redo-variant'/>

                        <Appbar.Action
                        icon = 'dots-vertical'/>
                    </View>
                </Appbar>
            </View>
        )
    }
}
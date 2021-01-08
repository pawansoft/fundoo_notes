import React, { Component } from 'react'
import {
    View,
    Image
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import NoteServices from '../../../../Services/firebase_services/NoteServices';
import backgroundImageStyle from '../../../Style/backgroundImageStyle';
import searchNoteStyle from '../../../Style/searchNotestyle'

export default class PopulatedLabel extends Component{
    constructor(props){
        super(props)
        this.state = {
            available_labels : []
        }
    }

    componentDidMount = async() => {
        NoteServices.getLabelFromDatabase()
        .then(async data => {
            let notes = data ? data : {}
            await this.setState({
                available_labels: notes
            })
        })
        .catch(error => console.log(error))
        console.log(this.state.available_labels);
    }

    render(){
        return(
            <View>
                <View>
                <Image style= { backgroundImageStyle.backgroundImage } source= {require('../../../assets/background1.jpg')}>
                </Image> 
                <Appbar style={searchNoteStyle.headerContainer}>
                    <Appbar.Action
                    icon='keyboard-backspace'/>
                    <TextInput placeholder = 'Enter label name'></TextInput>
                </Appbar>
                </View>
                <View>

                </View>
            
            <Appbar.Action>

            </Appbar.Action>
            </View>
        )
    }

}

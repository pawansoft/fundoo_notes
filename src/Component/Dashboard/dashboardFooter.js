import React, { Component } from 'react'
import {View} from 'react-native';
import { Appbar} from 'react-native-paper';
import dashboardStyle from '../../Style/dashboardStyle';

export default class BottomBar extends Component{
    constructor(props){
        super(props)
    }

    handleNewNoteCreateButton = () => {
        this.props.navigation.navigate('NewNotes')
    }

    render(){
        return(
            <View>
                <Appbar style = {dashboardStyle.headerContainer}>
                    <Appbar.Action
                        icon = 'check-box-outline'
                        onPress={() => console.log('Pressed button')}/>
                    
                    <Appbar.Action
                        icon = 'brush'
                        onPress={() => console.log('Pressed button')}/>
                    
                    <Appbar.Action
                        icon = 'microphone-outline'
                        onPress = {() => console.log('Nothing is added so far')}/>
        
                    <Appbar.Action
                        icon = 'panorama'
                        onPress = {() => console.log('Nothing is added so far')}/>
                        
                    <Appbar.Action
                        style = {dashboardStyle.plusButton}
                        icon = {require ('../../assets/plus.png')}
                        onPress = {this.handleNewNoteCreateButton}/>
                </Appbar>
            </View>
        )
    }
}
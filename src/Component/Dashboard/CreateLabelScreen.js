import React, { Component } from 'react'
import { 
    Text, View, TouchableOpacity, TextInput, ScrollView
} from 'react-native';

import {Appbar, Card, Title} from 'react-native-paper'
import NoteServices from '../../../Services/firebase_services/NoteServices';
import CreateNewLabelStyles from '../../Style/CreateNewLabelStyle';

export default class CreateLabelScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            label_detail: [],
            labelTextBoxStatus: true,
            labelText: ''
        }
    }


    createLabel = () => {
        this.setState({
            labelTextBoxStatus: !this.state.labelTextBoxStatus
        })
        if(this.state.labelText != '') {
            NoteServices._addLevelService(this.state.labelText).then
            (() => this.props.navigation.push('Home', {screen: 'Label'}))
        }
    }

    handleText = (text) => {
        this.setState({
            labelText: text
        })
    }

    handleBackButton = () => {
        this.props.navigation.push('Home', {screen : 'Notes'})
    }

    cancelLabel = () => {
        this.setState({
            labelText: '',
            labelTextBoxStatus: !this.state.labelTextBoxStatus
        })
        console.log('canceled');
    }
    componentDidMount = async() => {
        await NoteServices._getLevelService().then(async (data) => {           
            let labe_detail = data ? data : {}
            this.setState({
                label_detail : labe_detail
            })
        })
        .catch(error => console.log(error))
        console.log(this.state.label_detail);
    }

    changeToCreateLabel = () => {
        this.setState({
            labelTextBoxStatus: !this.state.labelTextBoxStatus
        })
    }

    render(){
        let labelKey = Object.keys(this.state.label_detail);
        return(
            <View style = {CreateNewLabelStyles.container}>
                <Appbar style = {CreateNewLabelStyles.appbar_Style}>
                    <Appbar.Action
                    icon = "keyboard-backspace"
                    onPress= {this.handleBackButton}/>
                    
                    <Text style = {CreateNewLabelStyles.edit_LabelStyle}>
                        Edit labels
                    </Text>
                </Appbar>

                <Appbar style = {(this.state.labelTextBoxStatus) ? CreateNewLabelStyles.appbar_Style_Active : CreateNewLabelStyles.appbar_Style}>
                    <Appbar.Action
                         icon = {(this.state.labelTextBoxStatus) ? "close" : "plus"}
                         onPress= {(this.state.labelTextBoxStatus) ? this.cancelLabel : this.changeToCreateLabel}
                         style = {{marginRight: '10%'}}
                       />
                       {this.state.labelTextBoxStatus ? 
                        <TextInput
                        placeholder = {'Create new Label'}
                        style = {{width: '60%'}}
                        autoFocus = {this.state.labelTextBoxStatus}
                        onChangeText = {this.handleText}/>
                       :
                       <TouchableOpacity 
                       onPress = {this.createLabel} 
                       style = {{width: '60%'}}>
                           <Text 
                               style = {{color: 'gray'}}>
                                   Create new Label
                           </Text>
                   </TouchableOpacity>}

                   <Appbar.Action
                        icon = {(this.state.labelTextBoxStatus) ? "check" : undefined}
                        onPress= {(this.state.labelTextBoxStatus) ? this.createLabel : null}
                    />
                </Appbar>
              
                <ScrollView>
                        {labelKey.length >0 ?
                        labelKey.reverse().map(key => (
                            <React.Fragment key={key}>
                                <Appbar style = {CreateNewLabelStyles.appbar_selected_level}>
                                    <Appbar.Action icon = {'label-outline'}/>
                                   
                                    <Text style = {CreateNewLabelStyles.appbar_selected_level_text}>
                                        {this.state.label_detail[key].label}
                                    </Text>

                                    <Appbar.Action
                                    icon = {require('../../assets/pen1.png')}/>
                                </Appbar>                                
                            </React.Fragment>
                        ))
                    : null}
                </ScrollView>
            </View>
        )
    }
}

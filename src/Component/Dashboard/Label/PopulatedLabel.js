import React, { Component } from 'react'
import {
    View,
    Image,
    Text
} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Checkbox } from 'react-native-paper';
import SQLiteLabelServices from '../../../../Services/SQLite_service/SQLiteLabelServices';
import backgroundImageStyle from '../../../Style/backgroundImageStyle';
import searchNoteStyle from '../../../Style/searchNotestyle'
import LabelAppbar from './LabelAppbar';

export default class PopulatedLabel extends Component{
    constructor(props){
        super(props)
        this.state = {
            search: '',
            available_labels : [],
            filterdLabel: [],
            selectedLabel : []
        }
    }

    componentDidMount = async() => {
        await SQLiteLabelServices.selectLabelFromSQliteStorage()
        .then(async result => {
            var temp = []
            if (result.rows.length != 0){
                for(let i = 0; i < result.rows.length ; ++i)
                    temp.push(result.rows.item(i))
                await this.setState({
                    available_labels : temp,
                    filterdLabel : temp
                })
            }
        })
    }

    handleBackButton = () => {
        if(this.props.route.params.newNote == true){
            let title = this.props.route.params.title;
            let note = this.props.route.params.note;
            this.props.navigation.push('NewNotes', {note : note, title : title, selectedLabel : this.state.selectedLabel, newNote : true, available_labels : this.state.available_labels})
        }
        else if(this.props.route.params.updateNote == true){
            let key = this.props.route.params.key;
            let title = this.props.route.params.title;
            let note = this.props.route.params.note;
            this.props.navigation.push('NewNotes', {note: note, key : key, title: title, selectedLabel : JSON.stringify(this.state.selectedLabel), updateNote : true})
        }
    }

    handleSelectedLabel = async (labelKey, operation) => {
        var labels = this.state.selectedLabel
        if(operation == 'add') {
            labels.push(labelKey)
            await this.setState({
                selectedLabel : labels
            })
        }
        else {
            let index = labels.indexOf(labelKey)
            labels.splice(index, 1)
            await this.setState({
                selectedLabel : labels
            })
        }
        console.log(this.state.selectedLabel);
    }

    handleSearchLabelInput = async (search) => {
        await this.setState({
            search : search,
        })
        if(this.state.search != ''){
            let temp = [];
            for(let i= 0; i < this.state.available_labels; ++i){
                if(this.state.available_labels[i].label.toLowerCase().include(searchText.toLowerCase())){
                    temp.push(this.state.available_labels[i])
                }
            }
            this.setState({
                filterdLabel: temp
            })
        }
        else{
            await this.setState({
                filterdLabel : this.state.available_labels
            })
        }

    }

    render(){
        return(
            <View>
                <View>
                <Image style= { backgroundImageStyle.backgroundImage } source= {require('../../../assets/background1.jpg')}>
                </Image> 
                <Appbar style={searchNoteStyle.headerContainer}>
                    <Appbar.Action
                    icon='keyboard-backspace'
                    onPress = {this.handleBackButton}/>
                    <TextInput placeholder = 'Enter label name'
                    onChangeText = {this.handleSearchLabelInput}
                    value = {this.state.search}></TextInput>
                </Appbar>
                </View>
                <ScrollView>
                {
                    (this.state.filterdLabel.length > 0)?
                        this.state.filterdLabel.map(val => (
                            <React.Fragment  key = {val.label_id}>
                                <LabelAppbar
                                    labelKey = {val.label_id}
                                    labels = {val}
                                    selectedLabel = {this.state.selectedLabel}
                                    handleSelectedLabel = {this,this.handleSelectedLabel}/>
                            </React.Fragment>
                        ))
                    :null
                }
                </ScrollView>
            
            <Appbar.Action>

            </Appbar.Action>
            </View>
        )
    }

}

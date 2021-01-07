import React, { Component } from 'react'
import {
    View,
    Text,
    Image
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import backgroundImageStyle from '../../../Style/backgroundImageStyle';
import searchNoteStyle from '../../../Style/searchNotestyle'
import {storeLabelContent, storeNoteKeys, storeLabels} from '../../../redux/actions/CreateNewLabelActions'
import { connect } from 'react-redux'

class SearchLabel extends Component{
    constructor(props){
        super(props)
        this.state = {
            createNewLabelTextboxActive: true,
            enteredLabel: '',
            labelContent: [],
            labelNoteKeys: [],
            labelExistErrorMessage: false
        }
    }

    render(){
        return(
            <View>
                <Image style= { backgroundImageStyle.backgroundImage } source= {require('../../../assets/background1.jpg')}>
                </Image> 
                <Appbar style={searchNoteStyle.headerContainer}>
                    <Appbar.Action
                    icon='keyboard-backspace'/>
                    <TextInput placeholder = 'Enter label name'></TextInput>
                </Appbar>
                <Text>
                    select label
                </Text>
            </View>
        )
    }

}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        labelContent : state.createLabelReducer.labelContent,
        labelNoteKeys : state.createLabelReducer.labelNoteKeys,
        labels: state.createLabelReducer.labels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeLabelContent : (labelContent) => dispatch(storeLabelContent(labelContent)),
        storeNoteKeys: (labelNoteKeys) => dispatch(storeNoteKeys(labelNoteKeys))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLabel);
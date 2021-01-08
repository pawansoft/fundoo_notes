import React, {Component} from 'react'
import {View, TextInput, ScrollView, Text} from 'react-native'
import { connect } from 'react-redux'
import {Appbar} from 'react-native-paper';
import PopulatedLabel from './PopulatedLabel';

class SelectLabel extends Component{
    constructor(props){
        super(props)
        this.state = {
            search : '',
            noteKeysAfterSearch : this.props.labelNoteKeys
        }

        console.log("From select Note"+this.state.noteKeysAfterSearch);
    }

    handleBackIconButton = () => {
        this.props.navigation.goBack();
    }

    handleSearchTextInput = async (searchText) => {
        await this.setState({
            search : searchText,
        })
        let tempNoteKeys = []
        if(this.state.search != '') {
            this.props.labelNoteKeys.map(noteKey => {
                if(this.props.labelContent[noteKey].label.labelName.toLowerCase().includes(searchText.toLowerCase())) {
                    tempNoteKeys.push(noteKey)
                }
            })
            this.setState({
                noteKeysAfterSearch: tempNoteKeys,
            })
        }
        else {
            await this.setState({
                noteKeysAfterSearch : this.props.labelNoteKeys
            })
        }
    }

    render() {
        return (
            <View >
                <View >
                    <Appbar >
                        <Appbar.Action  
                            style = {{marginLeft : 10}}
                            icon = 'keyboard-backspace'
                            onPress = {this.handleBackIconButton}/>
                        <TextInput    
                            placeholder = 'Enter Label Name'
                            onChangeText = {this.handleSearchTextInput}
                            autoFocus = {false}
                            value = {this.state.search}/>
                    </Appbar>
                </View>
                <ScrollView>
                    <View>
                        {
                            (this.state.noteKeysAfterSearch.length > 0) ?
                                this.state.noteKeysAfterSearch.map((noteKey => (
                                    <React.Fragment key = {noteKey}>
                                        < PopulatedLabel noteKey = {noteKey}/>
                                    </React.Fragment>
                                )))
                            : <Text style = {{alignSelf: 'center', marginTop: 30}}>
                                No Such Label
                            </Text>}
                    </View>
                </ScrollView>
            </View>
        )
    }

    
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        labelContent : state.createLabelReducer.labelContent,
        selectedLabelKeys : state.createLabelReducer.selectedLabelKeys,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        storeSelectedLabelKeys : (selectedLabelKeys) => dispatch(storeSelectedLabelKeys(selectedLabelKeys)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLabel)
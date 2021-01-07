import React, { Component } from 'react'
import {
    Text, View, TouchableOpacity, TextInput,
} from 'react-native';
import { connect } from 'react-redux'
import { Appbar } from 'react-native-paper'
import NoteServices from '../../../../Services/firebase_services/NoteServices';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { storeLabelContent, storeNoteKeys } from '../../../redux/actions/CreateNewLabelActions'
import LabelActionStyle from '../../../Style/LabelActionStyle';
import CreateNewLabelStyles from '../../../Style/CreateNewLabelStyle';

class LevelActions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            editLabel: '',
            editTextInput: this.props.labelContent[this.props.labelKey].labelName,
            emptyMsg: false,
            errorMsg: false,
            noteKeys: []
        }
    }

    handleCheckButton = async () => {
        if (!this.state.errorMsg && !this.state.emptyMsg) {
            this.setState({
                editLabel: ''
            })
            NoteServices.updateLabelInFirebase(this.props.labelKey, this.state.editTextInput)
                .then(async () => {
                    NoteServices.getLabelFromDatabase()
                        .then(async data => {
                            let labels = data ? data : {}
                            let tempKeys = []
                            tempKeys = Object.keys(labels)
                            await this.setState({
                                edit: false,
                                noteKeys: tempKeys,
                            })
                            await this.props.storeNoteKeys(this.state.noteKeys)
                        })
                })
                .catch(error => console.log(error))
        }
    }

    handleEditButton = (key) => {
        this.setState({
            editLabel: this.props.labelContent[key].labelName,
            edit: true
        })
    }

    handleEditTextInput = async (editText) => {
        let labelId = Object.keys(this.props.labelContent);
        let temp = []
        if (labelId.length > 0) {
            labelId.map(key => {
                temp.push(this.props.labelContent[key].labelName.toLowerCase())
            })
        }
        await this.setState({
            editTextInput: editText
        })
        if (this.state.editTextInput == '') {
            await this.setState({
                emptyMsg: true,
            })
        }
        else {
            await this.setState({
                emptyMsg: false
            })
            if (temp.includes(this.state.editTextInput.toLowerCase())) {
                await this.setState({
                    errorMsg: true,
                })
            }
            else {
                await this.setState({
                    errorMsg: false,
                })
            }
        }
    }

    handleDeleteButton = async () => {
        console.log(this.props.labelKey);
        await NoteServices.deleteLabelInFirebase(this.props.labelKey)
            .then(async () => {
                await NoteServices.getLabelFromDatabase()
                    .then(async data => {
                        let labels = data ? data : {}
                        let tempKeys = []
                        tempKeys = Object.keys(labels)
                        await this.setState({
                            edit: false,
                            noteKeys: tempKeys
                        }, () => {
                            this.props.storeNoteKeys(this.state.noteKeys)
                            this.props.storeLabelContent(labels)
                        })
                    })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Appbar style={(this.state.editLabel == this.state.editTextInput) ? LabelActionStyle.active_Appbar_Style : LabelActionStyle.appbar_Style}>
                {
                    (this.state.editLabel == this.state.editTextInput) ?
                        <TouchableOpacity onPress={this.handleDeleteButton}>
                            <Appbar.Action
                                icon='delete-outline'
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.handleEditButton(this.props.labelKey)}>
                            <Appbar.Action
                                icon='label-outline'
                                style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                }
                {
                    (this.state.editLabel == this.state.editTextInput) ?
                        <View style={{ flexDirection: 'column', width: '65%' }}>
                            <TextInput
                                style={(this.state.errorMsg || this.state.emptyMsg) ? CreateNewLabelStyles.textinput_error_style : LabelActionStyle.textinput_style}
                                autoFocus={true}
                                onChangeText={this.handleEditTextInput}
                                value={this.state.editTextInput}
                            />
                            {
                                (this.state.emptyMsg) ?
                                    <Text style={LabelActionStyle.text_error_style}>
                                        Enter a Label Name
                                 </Text>
                                    :
                                    (this.state.errorMsg) ?
                                        <Text style={LabelActionStyle.text_error_style}>
                                            Label Already Exist
                                     </Text>
                                        :
                                        null
                            }
                        </View>
                        :
                        <TouchableWithoutFeedback onPress={() => this.handleEditButton(this.props.labelKey)}>
                            <View>
                                <Text
                                    style={LabelActionStyle.text_style}>
                                    {this.state.editTextInput}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                }
                <Appbar.Content />
                {
                    (this.state.edit) ?
                        <TouchableOpacity onPress={this.handleCheckButton}>
                            <Appbar.Action
                                icon='check'
                            />
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => this.handleEditButton(this.props.labelKey)}>
                            <Appbar.Action
                                icon='pencil'
                            />
                        </TouchableOpacity>

                }
            </Appbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.createLabelReducer.userId,
        labelContent: state.createLabelReducer.labelContent,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeLabelContent: (labelContent) => dispatch(storeLabelContent(labelContent)),
        storeNoteKeys: (labelNoteKeys) => dispatch(storeNoteKeys(labelNoteKeys))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelActions)

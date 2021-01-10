import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { Drawer } from 'react-native-paper';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import DrawerStyle from '../../Style/DrawerStyle';
import { strings } from '../../Localization/Localization';
import { connect } from 'react-redux'
import {storeLabelContent, storeNoteKeys, storeLabels} from '../../redux/actions/CreateNewLabelActions'

import NoteServices from '../../../Services/firebase_services/NoteServices';

class DrawerContent extends Component {
    constructor(props){
        super(props)
        this.state = {
            labelsContent: [],
            labelNoteKeys: [],
            labels:[]
        }
    }

    componentDidMount = async () => {
        await NoteServices.getLabelFromDatabase()
        .then(async (labelContent) => {
            let tempKey = await Object.keys(labelContent)
            let labels = []
            tempKey.map(key => {
                labels.push(labelContent[key].labelName)
            })
            await this.setState({
                labelNoteKeys : tempKey,
                labelsContent: labelContent,
                labels : labels
            })
            await this.props.storeLabelContent(this.state.labelsContent);
            await this.props.storeNoteKeys(this.state.labelNoteKeys);
            await this.props.storeLabels(this.state.labelNoteKeys);
        })
        .catch(error => console.log(error))
        console.log(this.state.labelsContent);
    }

    handleNoteButton = () => {
        this.props.navigationProps.navigation.closeDrawer();
        this.props.navigationProps.navigation.push('Home', {screen : 'Notes'})
    }

    handleDeleteButton = () => {
        this.props.navigationProps.navigation.closeDrawer()
        this.props.navigationProps.navigation.push('Home', {screen : 'Delete'})
    }

    handleCreateNewLabelButton = () => {

        this.props.navigationProps.navigation.push('Home', {screen : 'Createlabel'})
    }

    handleArchiveButton = () => {
        this.props.navigationProps.navigation.push('Home', {screen: 'Archive'})
    }

    handleLabelButton = (labelId, labelName) => {
        this.props.navigationProps.navigation.push('Home', {screen: 'LabelScreen', params : {labelId : labelId, labelName : labelName}})
    }

    render(){
        return(
            <View style = {{flex : 1, backgroundColor : '#FFFFEF'}}>
                <Text style = {DrawerStyle.headerText}>{strings.fundoo}</Text>
                <DrawerContentScrollView>
                <Drawer.Section style = {DrawerStyle.dr}>
                    <Drawer.Item 
                    icon = 'lightbulb-outline'
                    label = {strings.Notes}
                    onPress = {this.handleNoteButton}/> 
                    
                    <Drawer.Item
                    icon = "bell-outline"
                    label = {strings.Reminder}/> 
                </Drawer.Section>
                
                <Drawer.Section>
                    {this.state.labelNoteKeys.map (key => (
                        <Drawer.Item 
                        key = {key} 
                        icon = 'label-outline' 
                        label = {this.state.labelsContent[key].labelName} 
                        onPress = {() => this.handleLabelButton(key, this.state.labelsContent[key].labelName )}
                        />
                    ))}
                    <Drawer.Item
                    icon = 'plus'
                    label = {strings.newLabel}
                    onPress = {this.handleCreateNewLabelButton}/>    
                </Drawer.Section>
                
                <Drawer.Section>
                    <Drawer.Item
                    icon = 'archive-arrow-down-outline'
                    label = {strings.Archive}
                    onPress = {() => this.handleArchiveButton()}/>

                    <Drawer.Item
                    icon = 'delete'
                    label = {strings.Delete}
                    onPress = {this.handleDeleteButton}/>
                </Drawer.Section>

                <Drawer.Item
                icon = 'cog-outline'
                label = {strings.Setting}/>

                <Drawer.Item
                icon = 'help-circle'
                label = {strings.HelpFeed}/>
                </DrawerContentScrollView>
            </View>
        )
   }
}

const styles = StyleSheet.create({
    bottomDrawerSection :{
        marginBottom : 15,
        borderTopColor: '#F4F4F4',
        borderTopWidth: 1
    }
})

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        labelsContent : state.createLabelReducer.labelsContent,
        labelNoteKeys : state.createLabelReducer.labelNoteKeys,
        labels : state.createLabelReducer.labels 
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        storeLabelContent : (labelsContent) => dispatch(storeLabelContent(labelsContent)),
        storeNoteKeys : (labelNoteKeys) => dispatch(storeNoteKeys(labelNoteKeys)),
        storeLabels : (labels) => dispatch(storeLabels(labels))
    }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(DrawerContent)
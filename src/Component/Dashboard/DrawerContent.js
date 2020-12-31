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
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../../../Services/UserServices/UserService';

class DrawerContent extends Component {
    constructor(props){
        super(props)
    }

    handleNoteButton = () => {
        this.props.navigationProps.navigation.push('Home', {screen : 'Notes'})
    }

    handleDeleteButton = () => {
        this.props.navigationProps.navigation.push('Home', {screen : 'Delete'})
    }

    handleLogoutButton = async() => {
        await AsyncStorage.setItem('isLoggedIn', 'false');
        await AsyncStorage.setItem('userId', '')
        UserService.logoutService().then(() => this.props.navigationProps.navigation.navigate('Login'))
        .catch(error => console.log(error))
        
    }
    render(){
        return(
            <View style = {{flex : 1}}>
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
                    <Drawer.Item
                    icon = 'plus'
                    label = {strings.newLabel}/>    
                </Drawer.Section>
                
                <Drawer.Section>
                    <Drawer.Item
                    icon = 'archive-arrow-down-outline'
                    label = {strings.Archive}/>

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

                <Drawer.Item
                style = {DrawerStyle.footer}
                icon = 'logout'
                label = {strings.Logout}
                onPress = {this.handleLogoutButton}/>
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

export default DrawerContent;
import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { Drawer } from 'react-native-paper';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import DrawerStyle from '../../Style/DrawerStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DrawerContent = ({props}) => {
   
    return(
        <View style = {{flex : 1}}>
            <Text style = {DrawerStyle.headerText}>Fundoo Notes</Text>
            <DrawerContentScrollView {...props}>
            <Drawer.Section style = {DrawerStyle.dr}>
                <Drawer.Item 
                icon = 'lightbulb-outline'
                label = "Notes"/> 

                <Drawer.Item
                icon = "bell-outline"
                label = "Reminder"/> 
            </Drawer.Section>
            
            <Drawer.Section>
                <Drawer.Item
                icon = 'plus'
                label = 'Create new label'/>    
            </Drawer.Section>
            
            <Drawer.Section>
                <Drawer.Item
                icon = 'archive-arrow-down-outline'
                label = 'Archive'/>

                <Drawer.Item
                icon = 'delete'
                label = 'Delete'/>
            </Drawer.Section>

            <Drawer.Item
            icon = 'cog-outline'
            label = 'Setting'/>

            <Drawer.Item
            icon = 'help-circle'
            label = 'Help & feedback'/>
            </DrawerContentScrollView>

            <Drawer.Item
            style = {DrawerStyle.footer}
            icon = 'logout'
            label = 'Logout'/>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomDrawerSection :{
        marginBottom : 15,
        borderTopColor: '#F4F4F4',
        borderTopWidth: 1
    }
})

export default DrawerContent;
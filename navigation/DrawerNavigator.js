import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NotesContainer from '../src/Component/NotesContainer';
import Reminder from '../src/Component/Reminder';
import DrawerContent from '../src/Component/DrawerContent';
import DashboardScreen from '../src/Component/DashboardScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator ({props}){
    return(
        <Drawer.Navigator drawerContent = {props => <DrawerContent {...props}/>}>
            <Drawer.Screen name = 'Notes' component = {DashboardScreen}/>
            <Drawer.Screen name = 'Reminder' component = {Reminder}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;;
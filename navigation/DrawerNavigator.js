import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashboardScreen from '../src/Component/Dashboard/DashboardScreen';
import Reminder from '../src/Component/Dashboard/Reminder';
import DrawerContent from '../src/Component/Dashboard/DrawerContent';

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
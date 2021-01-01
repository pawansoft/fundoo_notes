import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashboardScreen from '../src/Component/Dashboard/DashboardScreen';
import Reminder from '../src/Component/Dashboard/Reminder';
import DrawerContent from '../src/Component/Dashboard/DrawerContent';
import Delete from '../src/Component/Dashboard/Delete';
import { DeleteActionScreen } from '../src/Component/Dashboard/DeleteActionScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator (){
    return(
        <Drawer.Navigator drawerContent = { props => <DrawerContent navigationProps = {props}/>}>
            <Drawer.Screen name = 'Notes' component = {DashboardScreen}/>
            <Drawer.Screen name = 'Delete' component = {Delete}/>
            <Drawer.Screen name = 'Reminder' component = {Reminder}/>
            <Drawer.Screen name = 'DeleteAction' component = {DeleteActionScreen}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;;
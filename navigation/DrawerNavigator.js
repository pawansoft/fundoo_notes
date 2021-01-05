import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashboardScreen from '../src/Component/Dashboard/DashboardScreen';
import Reminder from '../src/Component/Dashboard/Reminder';
import DrawerContent from '../src/Component/Dashboard/DrawerContent';
import Delete from '../src/Component/Dashboard/Delete';
import { DeleteActionScreen } from '../src/Component/Dashboard/DeleteActionScreen';
import SearchNote from '../src/Component/Dashboard/SearchNotes';
import CreateLabelScreen from '../src/Component/Dashboard/CreateLabelScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator (){
    return(
        <Drawer.Navigator drawerContent = { props => <DrawerContent navigationProps = {props}/>}>
            <Drawer.Screen name = 'Notes' component = {DashboardScreen}/>
            <Drawer.Screen name = 'Delete' component = {Delete}/>
            <Drawer.Screen name = 'Reminder' component = {Reminder}/>
            <Drawer.Screen name = 'Search' component = {SearchNote}/>
            <Drawer.Screen name = 'DeleteAction' component = {DeleteActionScreen}/>
            <Drawer.Screen name = 'Label' component = {CreateLabelScreen}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;;
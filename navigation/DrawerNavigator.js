import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';import DashboardScreen from '../src/Component/Dashboard/DashboardScreen/DashboardScreen';
import Delete from '../src/Component/Dashboard/Delete/Delete';
import Reminder from '../src/Component/Dashboard/Reminder';
import SearchNote from '../src/Component/Dashboard/DashboardScreen/SearchNotes';
import CreateNewLabelScreen from '../src/Component/Dashboard/Label/CreateNewLabelScreen';
import { DeleteActionScreen } from '../src/Component/Dashboard/Delete/DeleteActionScreen';
import ArchiveScreen from '../src/Component/Dashboard/Archive/ArchiveScreen';
import DrawerContent from '../src/Component/Dashboard/DrawerContent';
import PopulatedLabel from '../src/Component/Dashboard/Label/PopulatedLabel';
;

const Drawer = createDrawerNavigator();

function DrawerNavigator (){
    return(
        <Drawer.Navigator drawerContent = { props => <DrawerContent navigationProps = {props}/>}>
            <Drawer.Screen name = 'Notes' component = {DashboardScreen}/>
            <Drawer.Screen name = 'Delete' component = {Delete}/>
            <Drawer.Screen name = 'Reminder' component = {Reminder}/>
            <Drawer.Screen name = 'Search' component = {SearchNote}/>
            <Drawer.Screen name = 'Createlabel' component = {CreateNewLabelScreen}/>
            <Drawer.Screen name = 'DeleteAction' component = {DeleteActionScreen}/>
            <Drawer.Screen name = 'Archive' component = {ArchiveScreen}/>
            <Drawer.Screen name = 'SelectLabel' component = {PopulatedLabel}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;;
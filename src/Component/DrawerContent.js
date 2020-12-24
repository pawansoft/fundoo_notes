import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';

function DrawerContent(){
    return(
        <View>
            <DrawerContentScrollView> 
            <Text>
                This is my drawer
            </Text>
            </DrawerContentScrollView>
            <Drawer.Section style = {styles.bottomDrawerSection}>
                <DrawerItem
                    label = 'Sign Out'
                />
            </Drawer.Section>
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
import React, { Component } from 'react';
import{
    View,
    ScrollView
} from 'react-native';

import { Appbar, Button, Avatar} from 'react-native-paper';
import dashboardStyle from '../Style/dashboardStyle';

import Dashboard from './Dashboard';
class DashboardScreen extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <View style = {{flex: 1}}>    
                <View>
                    <Appbar style = {dashboardStyle.headerContainer}>
                        <Appbar.Action
                        icon = 'menu'
                        onPress = {() => console.log('Nothing is added currently')}/>
                        <Appbar.Action style = {dashboardStyle.searchBar} icon = "magnify" onPress = {() => console.log('Nothing is added')}/>
                        <Avatar.Image style = {dashboardStyle.avatar} size = {40} source = {require('../assets/img.png')}/>
                    </Appbar>
                </View> 
                <ScrollView>
                    <View>
                        <Dashboard navigation = {this.props.navigation}/>
                    </View> 
                </ScrollView> 
                <View>
                    <Appbar style = {dashboardStyle.headerContainer}>
                    <Appbar.Action
                            icon = {require ('../assets/check.png')}
                            onPress={() => console.log('Pressed button')}/>
                   
                    <Appbar.Action
                            icon = 'draw'
                            onPress={() => console.log('Pressed button')}/>
                   
                    <Appbar.Action
                            icon = 'microphone-outline'
                            onPress = {() => console.log('Nothing is added so far')}/>
     
                    <Appbar.Action
                        icon = 'panorama'
                        onPress = {() => console.log('Nothing is added so far')}/>
                    
                    <Appbar.Action
                        style = {dashboardStyle.plusButton}
                        icon = {require ('../assets/plus.png')}/>
                    </Appbar>
                </View>
            </View>
        )
    }
}
export default DashboardScreen;
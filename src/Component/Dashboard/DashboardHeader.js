import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar, Searchbar} from 'react-native-paper';
import dashboardStyle from '../../Style/dashboardStyle';

export default class DashboardHeader extends Component{
    constructor(props) {
        super(props)  
    }

    render(){
        return(
            <Appbar style = {dashboardStyle.headerContainer}>
                <Appbar.Action
                icon = 'menu'
                onPress = {() => this.props.navigation.openDrawer()}/>
                
                <Searchbar
                placeholder = 'Search Notes' 
                style = {{width : '60%',}}
                onPress = {this.selectView}/>
                
                <Appbar.Action
                    style = {{marginRight : 10}}
                    icon = {(this.props.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                    onPress={this.props.onPress}/>
                <TouchableOpacity
                onPress = {this.props.onSelectProfile}>
                <Avatar.Image style = {{flexDirection: "row", justifyContent: "space-between", alignItems: "center"  }} 
                size = {40} 
                source = {require('../../assets/Profile.png')}/>
                </TouchableOpacity>
            </Appbar>
        )
    }
}
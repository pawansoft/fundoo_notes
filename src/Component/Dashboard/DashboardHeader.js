import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar, Searchbar} from 'react-native-paper';
import UserService from '../../../Services/UserServices/UserService';
import dashboardStyle from '../../Style/dashboardStyle';

export default class DashboardHeader extends Component{
    constructor(props) {
        super(props) 
        this.state ={
            imageUri: ''
        } 
    }

    // componentDidMount = async() => {
    //     await UserService.getProfileImageService()
    //     .then(uri => {
    //         this.setState({
    //             imageUri: uri                
    //         })
    //     }).catch(error => console.log(error)) 
    // }

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
                source = {(this.state.imageUri == '') ?require('../../assets/Profile.png'): {uri : this.state.fileUri}}/>
                </TouchableOpacity>
            </Appbar>
        )
    }
}
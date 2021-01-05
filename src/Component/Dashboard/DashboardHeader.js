import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar, Searchbar} from 'react-native-paper';
import Firebase from '../../../config/Firebase';
import dashboardStyle from '../../Style/dashboardStyle';
import UserService from '../../../Services/UserServices/UserService';

export default class DashboardHeader extends Component{
    constructor(props) {
        super(props) 
        this.state ={
            userid: '',
            userDetail: [],
            imageUri: ''
        } 
    }

    componentDidMount = async() => {
       const userId = JSON.parse(await AsyncStorage.getItem('userId'))
       await this.setState({
            userid: userId
       })
       console.log(this.state.userid);

       await UserService._getUserDetailService(this.state.userid).then(async data => {
        let userDetail = data ? data : {}
            await this.setState({
                userDetail: userDetail
            })
       })

        await this.setState({
            imageUri : this.state.userDetail[this.state.userid].photo,
        })
       console.log(this.state.imageUri);
    }

    handleSearch = () => {
        this.props.navigation.push('Home', {screen : 'Search'})
    }

    render(){
        return(
            <Appbar style = {dashboardStyle.headerContainer}>
                <Appbar.Action
                icon = 'menu'
                onPress = {() => this.props.navigation.openDrawer()}/>
                
                <Appbar.Content title ="Search your note" 
                icon="magnify" onPress = {() => this.props.navigation.push('Home', {screen : 'Search'})}/>

                <Appbar.Action
                    style = {{marginRight : 10}}
                    icon = {(this.props.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                    onPress={this.props.onPress}/>
                <TouchableOpacity
                onPress = {this.props.onSelectProfile}>
                <Avatar.Image style = {{flexDirection: "row", justifyContent: "space-between", alignItems: "center"  }} 
                size = {40} 
                source = {(this.state.imageUri == '') ?require('../../assets/Profile.png'): {uri : this.state.imageUri}}/>
                </TouchableOpacity>
            </Appbar>
        )
    }
}
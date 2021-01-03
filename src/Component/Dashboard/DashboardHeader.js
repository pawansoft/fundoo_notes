import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
// import RNFetchBlob from 'react-native-fetch-blob';
import { Appbar, Avatar, Searchbar} from 'react-native-paper';
import Firebase from '../../../config/Firebase';
import dashboardStyle from '../../Style/dashboardStyle';

// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob
// const Fetch = RNFetchBlob.polyfill.Fetch

export default class DashboardHeader extends Component{
    constructor(props) {
        super(props) 
        this.state ={
            imageUri: ''
        } 
    }

    componentDidMount = async() => {
       await this.getProfileImageService()
        .then(uri =>{
            console.log(uri);
            this.setState({
                imageUri: uri                
            })
        }).catch(error => console.log(error)) 
    }

    getProfileImageService =() => {
        return new Promise(async (resolve, reject) => {
            const userid = await AsyncStorage.getItem('userId');
            Firebase.storage().ref('/' +userid).getDownloadURL()
            .then(url => resolve(url))
            .catch(error => reject(error))
        })
    }

    render(){
        return(
            <Appbar style = {dashboardStyle.headerContainer}>
                <Appbar.Action
                icon = 'menu'
                onPress = {() => this.props.navigation.openDrawer()}/>
                
                <Searchbar
                
                placeholder = 'Search Notes' 
                style = {{width : '60%', color: 'black', backgroundColor: 'grey'}}
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
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, Menu } from 'react-native-paper';
import ProfileStyle from '../../Style/ProfileStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../../../Services/UserServices/UserService';
import RBSheet from 'react-native-raw-bottom-sheet';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
import RBsheetProfile from './RBSheetProfile';

export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            userDetail: [],
            userid : '',
            first_name: '',
            last_name: '',
            emailId: '',
            showSubmit : false,

            //Image picker
            filePath: '',
              fileData: '',
              fileUri: '',
        }
    }

    async componentDidMount(){
        const userid = await AsyncStorage.getItem('userId');
        await this.setState({
            userid :userid
        })
        await UserService._getUserDetailService(userid).then(async data => {
            let userDetail = data ? data : {}
            await this.setState({
                userDetail: userDetail
            })
        })
        await this.setState({
            first_name : this.state.userDetail['jg5rWFjB9EO3Id3PeAa6Put59n72'].first_name,
            last_name : this.state.userDetail['jg5rWFjB9EO3Id3PeAa6Put59n72'].last_name,
            emailId : this.state.userDetail['jg5rWFjB9EO3Id3PeAa6Put59n72'].userName
        })

    }

    launchCamera = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };

        launchCamera(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });
    
      }

      launchImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });
    
      }
      handleRBSheetOpenButton = async () => {
        this.RBSheet.open();
    }

    handleCancel = () => {
        const {onPress} = this.props
        this.RBSheet.close()
        //onPress();
    }

    render(){ 
        let userKey = Object.keys(this.state.userDetail);
        return(
            <View style = {{flex : 1}}>
                <TouchableOpacity
                onPress = {this.handleRBSheetOpenButton}>
                <Avatar.Image style = {ProfileStyle.image} 
                size = {100} 
                source = {(this.state.fileUri == '') ?require('../../assets/Profile.png'): {uri : this.state.fileUri}}/>
                </TouchableOpacity>
                
                <View style = {ProfileStyle.profileDetail}>
                    <Text style = {ProfileStyle.first_name}>First Name : {this.state.first_name}</Text>
                    <Text style = {ProfileStyle.last_name}>Last Name : {this.state.last_name}</Text>
                    <Text style = {ProfileStyle.email}>Email Id : {this.state.emailId}</Text>
                </View>
                
                <RBSheet
                    ref={ref => { this.RBSheet = ref }}
                    height={150}
                    customStyles={{
                        container: {
                            marginBottom: 50,
                            borderTopWidth: 1,
                            borderColor: "#d3d3d3",
                        },
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                    }}>
                    <RBsheetProfile
                    chooseFromLiberary = {this.launchImageLibrary}
                    takePhoto = {this.launchCamera}
                    cancle = {this.handleCancel}/>
                </RBSheet>
            
            </View>
        )
    }
}
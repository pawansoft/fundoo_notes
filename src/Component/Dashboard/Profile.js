import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, Menu } from 'react-native-paper';
import ProfileStyle from '../../Style/ProfileStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../../../Services/UserServices/UserService';
import RBSheet from 'react-native-raw-bottom-sheet';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
import RBsheetProfile from './RBSheetProfile';
import Firebase from '../../../config/Firebase';
import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const Fetch = RNFetchBlob.polyfill.Fetch

window.fetch = new Fetch({
    auto : true,
    binaryContentTypes : ['image/']
}).build()

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
            fileUri: '',
        }
    }

    uploadProfileImage = (uri, mime = 'application/octet-stream') => {
      return new Promise(async (resolve, reject) => {
          const userid = await AsyncStorage.getItem('userId');
          let uploadBlob = null
          const imageRef = Firebase.storage().ref(userid)
          fs.readFile(uri, 'base64')
          .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
              uploadBlob = blob
              return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL()
          })
          .then((url) => {
              UserService._updateImageUrlService(this.state.userid, url)
              resolve(url)
            })
            .catch((error) => {
              reject(error)
          })
        })
    }
  
    getProfileImageService =() => {
      return new Promise(async (resolve, reject) => {
          const userid = await AsyncStorage.getItem('userId');
          Firebase.storage().ref('/' +userid).getDownloadURL()
          .then(url => resolve(url))
          .catch(error => reject(error))
      })
    }

    uploadUserProfileImage = (imageUrl) => {
      Firebase.database().ref('users/')
    }

    async componentDidMount(){
        const userid = JSON.parse(await AsyncStorage.getItem('userId' ));
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
            first_name : this.state.userDetail[userid].first_name,
            last_name : this.state.userDetail[userid].last_name,
            emailId : this.state.userDetail[userid].userName
        })
        console.log(this.state.userid);
        console.log(this.state.first_name);

        await this.getProfileImageService()
        .then(url => {
            this.setState({
                fileUri: url
            })
        }).catch(error => console.log(error))
    }

    launchCamera = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };

        launchCamera(options, async (response) => {
          if (!response.didCancel) {
            await this.uploadProfileImage(response.uri)
            .then(url => {
                this.setState({
                    fileUri: url
                })
            })
            console.log('response', JSON.stringify(response));
            this.setState({
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
        launchImageLibrary(options, async(response) => {
          console.log('Response = ', response);
          if (!response.didCancel) {
            await this.uploadProfileImage(response.uri)
            .then(url => {
                this.setState({
                    fileUri: url
                })
            })
            console.log('response', JSON.stringify(response));
            this.setState({
              fileUri: response.uri
            });
          }
        })
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
                onPress = {this.handleRBSheetOpenButton}
                Icon = 'delete' >
                <Avatar.Image style = {ProfileStyle.image} 
                size = {100}
                source = {(this.state.fileUri == '') ?require('../../assets/Profile.png'): {uri : this.state.fileUri}}/>
                </TouchableOpacity>
                
                <View style = {ProfileStyle.profileDetail}>
                    <Text style = {ProfileStyle.first_name}>Name : {this.state.first_name} {this.state.last_name}</Text>
                    <Text style = {ProfileStyle.email}>Email Id : {this.state.emailId}</Text>
                </View>
                <View style = {{marginTop: '10%', flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Button>
                    Cancle
                  </Button>
                  <Button>
                    Logout
                  </Button>
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
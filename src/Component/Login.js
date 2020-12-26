import React, { Component } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    
} from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import {strings} from '../Localization/Localization'
import login_style from '../Style/login_style';
import UserService from '../../Services/UserServices/UserService';
import SocialService from '../../Services/UserServices/SocialService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            avatar_url: '',
            avatar_show: false,
            userNameValid: '',
            emailId: '',
            passwordValid: '',
            passcode: '',
            isLoggedIn : false,
        }
    }

    validateUserName = async () => {
        const regex = /^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*[@][0-9A-Za-z]+([.][a-zA-Z]{2,4})*$/
        if (regex.test(this.state.emailId) == false) {
            await this.setState({
                userNameValid: 'Invalid Email'
            })
        } else {
            await this.setState({
                userNameValid: ''
            })
        }
    }

    async componentDidMount(){
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const userId = await AsyncStorage.getItem('userId');
        console.log('userid' + userId);
        AsyncStorage.setItem('isLisLoggedIno', 'false')
        if(isLoggedIn == 'true'){
           
            this.props.navigation.navigate('Home')
        }
    }

    _setLogingStatusAndDeatil = async (userId) => {
        try {
            await this.setState({
                isLoggedIn: true
            })
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(this.state.isLoggedIn));
            await AsyncStorage.setItem('userId', JSON.stringify(userId));
        }
        catch(error) {
            console.log(error);
        }
    }
    
    validatePassword = async () => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/
        if (regex.test(this.state.passcode) == false) {
            await this.setState({
                passwordValid: 'Invalid Format'
            })
        } else {
            await this.setState({
                passwordValid: ''
            })
        }
    }

    handleUserName = async (emailId) => {
        await this.setState({
            emailId: emailId
        })
    }

    handlePassword = async (passcode) => {
        await this.setState({
            passcode: passcode
        })
    }

    handleLoginButton = () => {
        if (this.state.emailId != '' &&
            this.state.passcode != '' &&
            this.state.passwordValid == '' &&
            this.state.userNameValid == '') {
                UserService.LoginService(this.state.emailId, this.state.passcode)
                .then((userDetail) => {
                    this._setLogingStatusAndDeatil(userDetail.user.uid);
                    this.props.navigation.navigate('Home')
                }).catch((error) => 
                    this.props.navigation.navigate('dialog', {
                        error
                    }));
            
        }
        else {
            this.props.navigation.navigate('dialog', {
                error: 'Please fill all the details'
            })
        }
    }

    handleSignupButtonNavigation = () => {
        this.props.navigation.navigate('Signup')
    }

    handleFacebookButton = () => {
        SocialService.facebookLogin()
        .then(UserCredential =>{
            SocialService._storeFBDetailIntoFirebase(UserCredential);
            this._setLogingStatusAndDeatil(userDetails.user.uid);
            this.props.navigation.navigate('Home');
        })
        .catch(error => {
            this.props.navigation.navigate('dialog', {
                error
            })
        })
       
    }
    
    render() {
        return (
            <View>
                <View style={login_style.header_image}>
                    <Image source={require('../assets/logo.png')} />
                </View>

                <ScrollView style={login_style.scroll_view}>
                    <View style={login_style.container}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>{strings.Login}</Text>
                        <View style={login_style.text_container}>
                            <TextInput
                                value={this.state.emailId}
                                onChangeText={this.handleUserName}
                                placeholder={strings.emailId}
                                onEndEditing={this.validateUserName} />
                            <Text style={login_style.error_text}>{this.state.userNameValid}</Text>
                        </View>

                        <View style={login_style.text_container}>
                            <TextInput
                                secureTextEntry={true}
                                value={this.state.passcode}
                                onChangeText={this.handlePassword}
                                onEndEditing={this.validatePassword}
                                placeholder={strings.pass} />
                            <Text style={login_style.error_text}>{this.state.passwordValid}</Text>
                        </View>

                        <TouchableOpacity style={login_style.forget_password}
                            onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                            <Text style={login_style.forget_password_text}>
                                {strings.Forget} {strings.pass}
                            </Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={login_style.signup_button_container}
                                onPress={this.handleSignupButtonNavigation}>
                                <Text style={login_style.button_text}>
                                    {strings.Signup}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={login_style.login_button_container}
                                onPress={this.handleLoginButton}>
                                <Text style={login_style.button_text}>
                                    {strings.Login}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {login_style.facebook_button}>
                            <Button icon={'facebook'} mode= "contained" 
                                onPress = {this.handleFacebookButton}>
                                    {strings.facebook}
                            </Button>
                        </View>
                    </View>
              
                </ScrollView>
                
            </View>
        )
    }
}
import React, { Component } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    
} from 'react-native';
import { Button } from 'react-native-paper';

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
            password: '',
            isLoggedIn : false
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
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
        console.log(isLoggedIn);
        if(isLoggedIn == 'true'){
            const userDetail = await AsyncStorage.getItem('userCredential')
            this.props.navigation.navigate('Dashboard')
        }
    }

    _setLogingStatusAndDeatil = async (UserCredential) => {
        try{
                await this.setState({
                    isLoggedIn: true
                })
                await AsyncStorage.setItem('isLoggedIn', JSON.stringify(this.state.isLoggedIn));
                await AsyncStorage.setItem('userCredential', JSON.stringify(UserCredential));
        }catch(error){
            console.log(error);
        }
    }
    
    validatePassword = async () => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/
        if (regex.test(this.state.password) == false) {
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

    handlePassword = async (password) => {
        await this.setState({
            password: password
        })
    }

    handleLoginButton = () => {
        if (this.state.emailId != '' &&
            this.state.password != '' &&
            this.state.passwordValid == '' &&
            this.state.userNameValid == '') {
                UserService.LoginService(this.state.emailId, this.state.password)
                .then((userDetail) => {
                    this._setLogingStatusAndDeatil(userDetail);
                    this.props.navigation.navigate('Dashboard')
                }).catch(error => alert('Username or password is not correct!!'));
            
        }
        else {
            alert('Oops something went wrong !!')
        }
    }

    handleSignupButtonNavigation = () => {
        this.props.navigation.navigate('Signup')
    }

    handleFacebookButton = () => {
        SocialService.facebookLogin()
        .then(UserCredential =>{
            SocialService._storeFBDetailIntoFirebase(UserCredential);
            SocialService._storeFBDetailIntoFirebase(UserCredential)
            this._setLogingStatusAndDeatil(UserCredential);
            this.props.navigation.navigate('Dashboard');
        })
        .catch(error => {
            console.log(error);
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
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>Login</Text>
                        <View style={login_style.text_container}>
                            <TextInput
                                value={this.state.emailId}
                                onChangeText={this.handleUserName}
                                placeholder={'Email Id'}
                                onEndEditing={this.validateUserName} />
                            <Text style={login_style.error_text}>{this.state.userNameValid}</Text>
                        </View>

                        <View style={login_style.text_container}>
                            <TextInput
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={this.handlePassword}
                                onEndEditing={this.validatePassword}
                                placeholder={'Password'} />
                            <Text style={login_style.error_text}>{this.state.passwordValid}</Text>
                        </View>

                        <TouchableOpacity style={login_style.forget_password}
                            onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                            <Text style={login_style.forget_password_text}>
                                Forget Password
                            </Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={login_style.signup_button_container}
                                onPress={this.handleSignupButtonNavigation}>
                                <Text style={login_style.button_text}>
                                    Signup
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={login_style.login_button_container}
                                onPress={this.handleLoginButton}>
                                <Text style={login_style.button_text}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {login_style.facebook_button}>
                            <Button icon ='facebook' mode= "contained" 
                                onPress = {this.handleFacebookButton}>
                                    Login with facebook
                            </Button>
                        </View>
                    </View>
              
                </ScrollView>
            </View>
        )
    }
}
import React, { Component } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,

} from 'react-native';
import { Button, Paragraph, Dialog, Portal, Snackbar } from 'react-native-paper';
import { strings } from '../Localization/Localization'
import login_style from '../Style/login_style';
import UserService from '../../Services/UserServices/UserService';
import SocialService from '../../Services/UserServices/SocialService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            passcode: '',
            isLoggedIn: false,
            emailError: '',
            passwordError: '',
        }
    }

    componentDidMount = async() => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const userId = await AsyncStorage.getItem('userId');
        if (isLoggedIn == 'true') {
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
        catch (error) {
            console.log(error);
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

    handleLoginButton = async() => {
        if (this.state.emailId != '' &&
            this.state.passcode != '') {
          await UserService.LoginService(this.state.emailId, this.state.passcode)
                .then((userDetail) => {
                    this._setLogingStatusAndDeatil(userDetail.user.uid);
                    this.props.navigation.navigate('Home')
                }).catch(async error =>{
                    if(error === 'User not Found') {
                        await this.setState({
                            emailError: 'UserNotFound'
                        })
                    } else if(error === 'Invalid Email') {
                        await this.setState({
                            emailError: 'InvalidEmail'
                        })
                    }   
                    else if(error === 'Invalid Password') {
                        await this.setState({
                            passwordError: 'InvalidPassword'
                        })
                    }
                });

        }
        else {
            await this.setState({
                emailError : 'Require',
                passwordError: 'Require'
            })
        }
    }

    handleSignupButtonNavigation = () => {
        this.props.navigation.navigate('Signup')
    }

    handleFacebookButton = () => {
        SocialService.facebookLogin()
            .then(UserCredential => {
                SocialService._storeFBDetailIntoFirebase(UserCredential);
                this._setLogingStatusAndDeatil(userDetails.user.uid);
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error);
            })

    }

    handleIsSignInSnakbar = async() => {
        await this.setState({
            isSignIn: false
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
                            <Text style={login_style.error_text}>{this.state.emailError}</Text>
                        </View>

                        <View style={login_style.text_container}>
                            <TextInput
                                secureTextEntry={true}
                                value={this.state.passcode}
                                onChangeText={this.handlePassword}
                                onEndEditing={this.validatePassword}
                                placeholder={strings.pass} />
                            <Text style={login_style.error_text}>{this.state.passwordError}</Text>
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
                        <View style={login_style.facebook_button}>
                            <Button icon={'facebook'} mode="contained"
                                onPress={this.handleFacebookButton}>
                                {strings.facebook}
                            </Button>
                        </View>
                    </View>

                </ScrollView>
                <Snackbar
                    style = {{ marginBottom: '30%' }}
                    visible = {this.state.isSignin}
                    onDismiss = {this.handleIsSignInSnakbar}
                    duration = {10000}>
                        Siggned in successfully
                </Snackbar>

            </View>
        )
    }
}
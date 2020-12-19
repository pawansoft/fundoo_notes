import React, { Component } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView
} from 'react-native';

import UserService, { ResetPasscodeService } from '../../Services/UserServices/UserService';
import login_style from '../Style/login_style';
import reset_component_style from '../Style/reset_component_style';
import DialogeBox from './DialogeBox';
export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmailValid: '',
            emailId: '',
        }
    }

    findValidEmail = async () => {
        const regex = /^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*[@][0-9A-Za-z]+([.][a-zA-Z]{2,4})*$/
        if (regex.test(this.state.emailId) == false) {
            await this.setState({
                isEmailValid: 'Invalid Email'
            })
        } else {
            await this.setState({
                isEmailValid: ''
            })
        }
    }

    handleEmailId = async (emailId) => {
        await this.setState({
            emailId: emailId
        })
    }

    handleResetButton = () => {
        if (
            this.state.emailId != '' &&
            this.state.isEmailValid == '') {
                UserService.ResetPasscodeService(this.state.emailId).then(() => {
                    alert('Password reset mail has sent to you please check your mail')
                })
                .catch(error => console.log(error))     
        }
        else {
            alert('Oops something went wrong')
        }
    }

    handleLoginButton = () => {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View>
                <View style={login_style.header_image}>
                    <Image source={require('../assets/logo.png')} />
                </View>

                <ScrollView style={login_style.scroll_view}>
                    <View style={login_style.container}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>Reset Password</Text>
                        
                    <View style={reset_component_style.text_container}>
                        <TextInput
                            value={this.state.emailId}
                            onChangeText={this.handleEmailId}
                            placeholder={'Email Id'}
                            onEndEditing={this.findValidEmail} />
                        <Text style={login_style.error_text}>{this.state.isEmailValid}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={login_style.signup_button_container}
                            onPress={this.handleResetButton}>
                            <Text style={login_style.button_text}>
                                Next
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{ marginLeft: '30%', marginTop: '7%' }}
                            onPress={this.handleLoginButton}>
                            <Text style={login_style.button_text}>
                                Go to Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}

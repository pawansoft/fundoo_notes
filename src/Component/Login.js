import React, { Component } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView
} from 'react-native';
import login_style from '../Style/login_style';

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            userNameValid: '',
            userName: '',
            passwordValid: '',
            password: '',
        }
    }

    validateUserName = async() => {
        const regex = /^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*[@][0-9A-Za-z]+([.][a-zA-Z]{2,4})*$/
        if(regex.test(this.state.userName) == false ){
            await this.setState({
                userNameValid : 'Invalid Email'
            })
        }else{
            await this.setState({
                userNameValid : ''
            })
        }
    }

    validatePassword = async() => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/
        if(regex.test(this.state.password) == false ){
            await this.setState({
                passwordValid : 'Invalid Format'
            })
        }else{
            await this.setState({
                userNameValid : ''
            })
        }
    }

    handleUserName = async(userName) => {
        await this.setState({
            userName : userName
        })
    }

    handlePassword = async(password) => {
        await this.setState({
            password : password
        })
    }

    render() {
        return (
            <View>
                <View style = {login_style.header_image}>
                    <Image  source={require('../assets/logo.png')}/>
                </View>

               
                <ScrollView style = {login_style.scroll_view}>
                <View style = {login_style.container}>
                
                    <View style = {login_style.text_container}>
                        <TextInput

                            value = {this.state.userName}
                            onChangeText = {this.handleUserName}
                        placeholder={'Username'}
                        onEndEditing = {this.validateUserName} />
                        <Text style = {login_style.error_text}>{this.state.userNameValid}</Text>
                </View>
                <View style = {login_style.text_container}>
                    <TextInput
                        
                        secureTextEntry={true}
                        value = {this.state.password}
                        onChangeText = {this.handlePassword}
                        onEndEditing = {this.validatePassword}
                        placeholder={'Password'} />
                        <Text style = {login_style.error_text}>{this.state.passwordValid}</Text>
                </View>
                <TouchableOpacity style = {login_style.forget_password}>
                            <Text>
                                Forget Password
                            </Text>
                        </TouchableOpacity>
                    
                
                <View style={{ flexDirection: 'row' }}>
                    
                    <TouchableOpacity 
                    style = {login_style.signup_button_container}
                    onPress = {() => this.props.navigation.navigate('Signup')}>

                        <Text style = {login_style.button_text}> 
                            Signup
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style = {login_style.login_button_container}>
                        <Text style = {login_style.button_text}>
                            Login                   
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            </ScrollView>
            </View>
        )
    }
}

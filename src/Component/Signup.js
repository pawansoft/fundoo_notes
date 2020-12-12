import React, { Component } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import RegisterStyle from '../Style/Register';

export default class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            fnameValid: '',
            fname: '',
            lnameValid: '',
            lname: '',
            userNameValid: '',
            userName: '',
            passwordValid: '',
            password: '',
            passMatch: '',
            confirm: '',

        }
    }

    validateFName = async() =>{
        const regex = /[A-Z][a-z]{3,}/
        if(regex.test(this.state.fname) == false){
            await this.setState({
                fnameValid : 'invalid',
            })
        }
        else{
            await this.setState({
                fnameValid : ''
            })
        } 
    }

    validateLName = async() => {
        const regex = /[A-Z][a-z]{3,}/
        if(regex.test(this.state.lname) == false){
            await this.setState({
                lnameValid : 'invalid',
            })
        }
        else{
            await this.setState({
                lnameValid : ''
            })
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
                passwordValid : 'Not Strong'
            })
        }else{
            await this.setState({
                userNameValid : ''
            })
        }
    }

    comparePassword = async() => {
        if(this.state.password == this.state.confirm && this.state.passwordValid != ''){
            await this.setState({
                passMatch: 'Wrong Password'
            })           
        }
        else{
            await this.setState({
                passMatch: ''
            })
        }
    }

    handleFName = async(fname) => {
        await this.setState({
            fname : fname
        })
    }

    handleLName = async(lname) => {
        await this.setState({
            lname : lname
        })
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

    handleConfirm = async(confirm) => {
        await this.setState({
            confirm : confirm
        })
    }

    render() {
        return (
            <View>

                <View>
                    <Image source={require('../assets/logo.png')} style = {{marginLeft : '20%'}}/>
                </View>

                <View>
                    <Text style = {RegisterStyle.signin_text}>
                        Sign Up
                    </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={RegisterStyle.row_text_input}>
                    <TextInput
                        placeholder={'First Name'}
                        value = {this.state.fname} 
                        onChangeText = {this.handleFName}
                        onEndEditing = {this.validateFName}/>
                         <Text style = {RegisterStyle.error_first_name}>{this.state.fnameValid}</Text>
                    </View>
                   
                    <View style={RegisterStyle.row_text_input}>
                    <TextInput
                        value = {this.state.lname}
                        onChangeText = {this.handleLName}
                        placeholder={'Last Name'}
                        onEndEditing = {this.validateLName} />
                        <Text style = {RegisterStyle.error_first_name}>{this.state.lnameValid}</Text>
                    </View>
                </View>

                <View>
                    <TextInput
                        style={RegisterStyle.text_input}
                        value = {this.state.userName}
                        onChangeText = {this.handleUserName}
                        placeholder={'Username'}
                        onEndEditing = {this.validateUserName} />
                        <Text style = {RegisterStyle.error_first_name}>{this.state.userNameValid}</Text>
                </View>
                
                <View style={{ flexDirection: 'row' }}>
                    <View style = {RegisterStyle.row_text_input}>
                    <TextInput
                        secureTextEntry={true}
                        value = {this.state.password}
                        onChangeText = {this.handlePassword}
                        onEndEditing = {this.validatePassword}
                        placeholder={'Password'} />
                        <Text style = {RegisterStyle.passcode_error}>{this.state.passwordValid}</Text>
                    </View>
                    <View style={RegisterStyle.row_text_input}>
                    <TextInput
                        secureTextEntry = {true}
                        value = {this.state.confirm}
                        onChangeText = {this.handleConfirm}
                        onEndEditing = {this.comparePassword}
                        placeholder={'Confirm'} />
                        <Text style = {RegisterStyle.passcode_error}>{this.state.passMatch}</Text>
                </View >
                </View>

                <View style={{ flexDirection: 'row' }}>
                    
                    <TouchableOpacity style = {RegisterStyle.touchable_opacity_style}>
                        <Text style ={RegisterStyle.button_Text}> 
                            Sign in instead
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style = {RegisterStyle.button}>
                        <Text style ={RegisterStyle.button_Text}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

import React, { Component } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import UserService from '../../Services/UserServices/UserService';
import RegisterStyle from '../Style/Register';
import {strings} from '../Localization/Localization'
import SQLiteCRUDService from '../../Services/SQLite_service/SQLiteCRUDService';
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
        if(regex.test(this.state.password) == false && this.state.password != ''){
            await this.setState({
                passwordValid : 'Not Strong'
            })
        }else{
            await this.setState({
                passwordValid : ''
            })
        }
    }

    comparePassword = async() => {
        if(this.state.password != this.state.confirm){
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

    handleSignUpButton = () => {
        if(this.state.fname != '' &&
        this.state.lname != '' &&
        this.state.userName != '' &&
        this.state.password != '' &&
        this.state.fnameValid == '' &&
        this.state.lnameValid =='' &&
        this.state.userNameValid =='' &&
        this.state.passwordValid == '' &&
        this.state.passMatch == ''){
            UserService.SignupService(this.state.userName, this.state.password)
            .then((userDetails) => {
                SQLiteCRUDService.storeUserDetailToSQLLiteService(this.state.userName, this.state.fname, this.state.lastname).then(() => {
                    console.log('Success');
                }).catch(error => console.log(error))
                UserService.storeDetailToDatabase(userDetails.user.uid, this.state.userName, this.state.fname, this.state.lname)
                this.props.navigation.navigate('Login')
            }).catch(error => 
                this.props.navigation.navigate('dialog', {
                    error
                }))
            
        }
        else{
            this.props.navigation.navigate('dialog',{
                error : 'Some fields are invalid to null'
            })
        }
    }

    SigninInsteadNavigationHandler = () => {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View>

                <View>
                    <Image source={require('../assets/logo.png')} style = {{marginLeft : '20%'}}/>
                </View>

                <View>
                    <Text style = {RegisterStyle.signin_text}>
                        {strings.Signup}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={RegisterStyle.row_text_input}>
                    <TextInput
                        placeholder = {strings.firstname}
                        value = {this.state.fname} 
                        onChangeText = {this.handleFName}
                        onEndEditing = {this.validateFName}/>
                         <Text style = {RegisterStyle.error_first_name}>{this.state.fnameValid}</Text>
                    </View>
                   
                    <View style={RegisterStyle.row_text_input}>
                    <TextInput
                        value = {this.state.lname}
                        onChangeText = {this.handleLName}
                        placeholder = {strings.lastname}
                        onEndEditing = {this.validateLName} />
                        <Text style = {RegisterStyle.error_first_name}>{this.state.lnameValid}</Text>
                    </View>
                </View>

                <View>
                    <TextInput
                        style={RegisterStyle.text_input}
                        value = {this.state.userName}
                        onChangeText = {this.handleUserName}
                        placeholder = {strings.username}
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
                        placeholder = {strings.pass} />
                        <Text style = {RegisterStyle.passcode_error}>{this.state.passwordValid}</Text>
                    </View>
                    <View style={RegisterStyle.row_text_input}>
                    <TextInput
                        secureTextEntry = {true}
                        value = {this.state.confirm}
                        onChangeText = {this.handleConfirm}
                        onEndEditing = {this.comparePassword}
                        placeholder = {strings.confirm} />
                        <Text style = {RegisterStyle.passcode_error}>{this.state.passMatch}</Text>
                </View >
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style = {RegisterStyle.touchable_opacity_style}
                    onPress = {this.SigninInsteadNavigationHandler}>
                        <Text style = {RegisterStyle.button_text}> 
                            {strings.signin}
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style = {RegisterStyle.button}
                        onPress = {this.handleSignUpButton}>
                        <Text style ={RegisterStyle.button_text}>
                            {strings.next}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

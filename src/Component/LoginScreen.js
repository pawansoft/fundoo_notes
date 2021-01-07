import React from 'react';
import { View, Image } from 'react-native';
import backgroundImageStyle from '../Style/backgroundImageStyle';
import Login from './Login';

const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Image style= { backgroundImageStyle.backgroundImage } source= {require('../assets/background1.jpg')}>
            </Image>
            <Login navigation={navigation} />
               
        </View>
        
    )
}

export default LoginScreen;
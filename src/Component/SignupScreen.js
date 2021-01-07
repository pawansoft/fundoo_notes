import React from 'react';
import {View, Image} from 'react-native';
import backgroundImageStyle from '../Style/backgroundImageStyle';
import Signup from './Signup';

const SignupScreen = ({ navigation }) => {
    return (
        <View>
             <Image style= { backgroundImageStyle.backgroundImage } source= {require('../assets/background1.jpg')}>
            </Image> 
            <Signup navigation={navigation} />
        </View>
       
    )
}

export default SignupScreen;
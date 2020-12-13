import React from 'react';
import 'react-native-gesture-handler';
import{NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from  '@react-navigation/stack';
import LoginScreen from '../src/Component/LoginScreen';
import SignupScreen from '../src/Component/SignupScreen';

const Stack = createStackNavigator();

function StackScreen(){
    return(
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName = "Login"
            screenOptions = {{headerShown : false}}>
                <Stack.Screen name = "Login" component = {LoginScreen} />
                <Stack.Screen name = "Signup" component = {SignupScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackScreen;
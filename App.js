import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Login from './src/Component/Login';
import Signup from './src/Component/Signup';

export default class App extends Component{
  render(){
    return(
      <View>
      <Login/>
    </View>
    
    )
  }
 
};



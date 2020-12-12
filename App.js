import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Signup from './src/Component/Signup';

export default class App extends Component{
  render(){
    return(
      <View>
      <Signup/>
    </View>
    
    )
  }
 
};



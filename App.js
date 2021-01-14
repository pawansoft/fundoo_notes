import React, { Component } from 'react';
import StackScreen from './navigation/StackScreen';
import {Provider} from 'react-redux'
import store from './src/redux/store'
import PushNotificationService from './Services/push-notification-service/PushNotificationService';
import PushNotification from 'react-native-push-notification';

export default class App extends Component{

  componentDidMount = () =>{
    PushNotificationService.checkPermission();
   
    PushNotification.configure({
      onRegister: function (token) {
          console.log("TOKEN:", token);
      },

      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        alert(notification.message)
      },
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
      onRegistrationError: function(err) {
          console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
    
  }


  render(){
    return(
      <Provider store = {store}>
      <StackScreen/>
      </Provider> 
    )
  }
};



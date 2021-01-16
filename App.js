import React, { Component } from 'react';
import StackScreen from './navigation/StackScreen';
import {Provider} from 'react-redux'
import store from './src/redux/store'
import PushNotificationService from './Services/push-notification-service/PushNotificationService';
import PushNotification from 'react-native-push-notification';
import Notifications from './Services/push-notification-service/Notifications';
import BackgroundJob from 'react-native-background-job';
import { AppState } from 'react-native';
export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      appState: AppState.currentState
    }
  }

  componentDidMount = async() =>{
   
    AppState.addEventListener("change", this._handleAppStateChange);

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

  backgroundJob = {
    jobKey : 'PushLotification',
    job: () => {
      setInterval(() => {
        Notifications.sendLocalNotification();
      }, 60000);
    }
  }

  
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) 
    ) {
      console.log("app is in background");
      BackgroundJob.register(this.backgroundJob)
    }
    else{
      console.log("in else condition");
      setInterval(() => {
        Notifications.sendLocalNotification();
      }, 30000);
    }

    this.setState({ appState: nextAppState });
  };

  render(){
    return(
      <Provider store = {store}>
      <StackScreen/>
      </Provider> 
    )
  }
};



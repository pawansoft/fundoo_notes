import React, { Component } from 'react';
import StackScreen from './navigation/StackScreen';
import { Provider } from 'react-redux'
import store from './src/redux/store'
// import PushNotificationService from './Services/push-notification-service/PushNotificationService';
// import PushNotification from 'react-native-push-notification';
// import BackgroundTimer from 'react-native-background-timer';
// import Notifications from './Services/push-notification-service/Notifications';
import NoteServices from './Services/firebase_services/NoteServices';
// import {NativeModules} from 'react-native'
// const {PushNotificationModule} = NativeModules;

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
    // PushNotificationModule.startService();

    // PushNotificationService.checkPermission();

    // PushNotification.configure({
    //   onRegister: function (token) {
    //     console.log("TOKEN:", token);
    //   },

      // onNotification: function (notification) {
      //   console.log("NOTIFICATION:", notification);
      //   alert(notification.message)
      // },
      // onAction: function (notification) {
      //   console.log("ACTION:", notification.action);
      //   console.log("NOTIFICATION:", notification);
      // },
      
    //   onRegistrationError: function (err) {
    //     console.error(err.message, err);
    //   },
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });  
    NoteServices._getNoteService()
    .then(data => console.log(data))
    .catch(error => console.log(error))
    
    // BackgroundTimer.setInterval(() =>{
    //   Notifications.sendLocalNotification();
    // }, 60000)
  }

  render() {
    return (
      <Provider store={store}>
        <StackScreen />
      </Provider>
    )
  }
};



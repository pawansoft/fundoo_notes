/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Notifications from './Services/push-notification-service/Notifications';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('SendLocalNotification', () => Notifications.sendLocalNotification)

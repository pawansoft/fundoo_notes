/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

export const SECURITY_LEVEL = Object.freeze({ ANY: RNKeychainManager && RNKeychainManager.SECURITY_LEVEL_ANY, SECURE_SOFTWARE: RNKeychainManager && RNKeychainManager.SECURITY_LEVEL_SECURE_SOFTWARE, SECURE_HARDWARE: RNKeychainManager && RNKeychainManager.SECURITY_LEVEL_SECURE_HARDWARE, });
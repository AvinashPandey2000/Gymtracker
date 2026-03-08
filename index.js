/**
 * @format
 */

import { AppRegistry } from 'react-native';
import notifee from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    // Can be used to handle background notification clicks
});

AppRegistry.registerComponent(appName, () => App);

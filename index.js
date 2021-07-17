/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/App';
import {name as appName} from './app.json';
import PushController from './src/PushController'


AppRegistry.registerComponent(appName, () => PushController);

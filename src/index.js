import { registerRootComponent } from 'expo';
import { AppRegistry, LogBox } from 'react-native';

import { App } from './App';

LogBox.ignoreLogs(['Setting a timer']);

registerRootComponent(App);
AppRegistry.registerComponent('main', () => App);

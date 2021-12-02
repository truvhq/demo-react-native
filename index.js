import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import { App } from './src/App';

LogBox.ignoreLogs(['Setting a timer']);

registerRootComponent(App);

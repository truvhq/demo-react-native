import { registerRootComponent } from 'expo';
import { YellowBox } from 'react-native';

import { App } from './src/App';

YellowBox.ignoreWarnings(['Setting a timer']);

registerRootComponent(App);

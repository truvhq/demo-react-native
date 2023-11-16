/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import TruvBridge from '@truv/react-native';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TruvBridge
          bridgeToken="71730d030dd24aac8638088f67d27fb5"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1, flexDirection: 'column'}}
          onEvent={function (payload: Record<string, unknown>): void {
            console.log(payload);
          }}
          onLoad={function (): void {
            console.log('loaded');
          }}
          onClose={function (): void {
            console.log('closed');
          }}
          onSuccess={function (): void {
            console.log('success');
          }}
          onError={function (): void {
            console.log('error', arguments);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;

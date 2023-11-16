import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

import {Navigation} from './Navigation';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </>
  );
};

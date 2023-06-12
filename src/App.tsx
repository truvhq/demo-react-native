import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { RecoilRoot } from 'recoil';

import { Navigation } from './Navigation';

export const App = () => {
  return (
    <RootSiblingParent>
      <RecoilRoot>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </RecoilRoot>
    </RootSiblingParent>
  );
};

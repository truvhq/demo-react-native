import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { RecoilRoot } from 'recoil';

import { Navigation } from './Navigation';

export const App = () => {
  return (
    <RootSiblingParent>
      <RecoilRoot>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </RecoilRoot>
    </RootSiblingParent>
  );
};

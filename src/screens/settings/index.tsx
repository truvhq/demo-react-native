import React, { Suspense } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { AccessKeysScreen } from './AccessKeysScreen';
import { ClientIdScreen } from './ClientIdScreen';
import { SettingsScreen } from './SettingsScreen';
import { SettingsStackParamList } from './types';

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export const Settings = () => {
  return (
    <Suspense fallback={<View />}>
      <SettingsStack.Navigator screenOptions={({ route }) => ({ title: route?.params?.title || route.name })}>
        <SettingsStack.Screen component={SettingsScreen} name="Index" options={{ headerShown: false }} />
        <SettingsStack.Screen component={ClientIdScreen} name="Client ID" />
        <SettingsStack.Screen component={AccessKeysScreen} name="AccessKeysScreen" />
      </SettingsStack.Navigator>
    </Suspense>
  );
};

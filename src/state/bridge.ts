import asyncStorage from '@react-native-async-storage/async-storage';
import { selector, useRecoilValueLoadable } from 'recoil';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import { TruvApiClient } from '../api/truv';
import { productSettingsState } from './product';
import { selectedSettings } from './settings';

const userIdState = selector<string>({
  key: 'userId',
  get: async ({ get }) => {
    const settings = get(selectedSettings);

    try {
      const apiClient = new TruvApiClient(process.env.TRUV_API_HOST as string, settings.clientId, settings.accessKey);
      const userId = await apiClient.createUser(`react-native-demo-${uuid()}`);

      console.log('created user with id ', userId);

      await asyncStorage.setItem('userId', userId);

      return userId;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
});

const bridgeTokenState = selector<string>({
  key: 'bridgeToken',
  get: async ({ get }) => {
    const settings = get(selectedSettings);

    const productSettings = get(productSettingsState);
    const apiClient = new TruvApiClient(process.env.TRUV_API_HOST as string, settings.clientId, settings.accessKey);
    const userId = get(userIdState);

    console.log('creating bridge token for user ', userId);

    try {
      const bridgeToken = await apiClient.getBridgeToken(userId, productSettings);

      console.log('got bridge token', bridgeToken);

      return bridgeToken;
    } catch (e) {
      console.error('error getting bridge token', e);
      throw e;
    }
  },
});

export const useBridgeToken = () => {
  return useRecoilValueLoadable(bridgeTokenState);
};

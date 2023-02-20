import asyncStorage from '@react-native-async-storage/async-storage';
import { selector, useRecoilValueLoadable } from 'recoil';

import { TruvApiClient } from '../api/truv';
import { productSettingsState } from './product';
import { selectedSettings } from './settings';

const userIdState = selector<string>({
  key: 'userId',
  get: async ({ get }) => {
    const cachedUserId = await asyncStorage.getItem('userId');

    if (cachedUserId) {
      return cachedUserId;
    }

    const settings = get(selectedSettings);

    const apiClient = new TruvApiClient(process.env.TRUV_API_HOST as string, settings.clientId, settings.accessKey);
    const userId = await apiClient.createUser('demo-app');

    await asyncStorage.setItem('userId', userId);

    return userId;
  },
});

const bridgeTokenState = selector<string>({
  key: 'bridgeToken',
  get: async ({ get }) => {
    const settings = get(selectedSettings);
    const productSettings = get(productSettingsState);
    const apiClient = new TruvApiClient(process.env.TRUV_API_HOST as string, settings.clientId, settings.accessKey);
    const userId = get(userIdState);

    return apiClient.getBridgeToken(userId, productSettings);
  },
});

export const useBridgeToken = () => {
  return useRecoilValueLoadable(bridgeTokenState);
};

import asyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import {productSettingsState} from './product';
import {selectedSettings} from './settings';
import {TruvApiClient} from '../api/truv';
import {atom, useAtomValue} from 'jotai';
import {loadable} from 'jotai/utils';

const userIdState = atom(async get => {
  const settings = await get(selectedSettings);

  try {
    const apiClient = new TruvApiClient(
      settings.apiHost,
      settings.clientId,
      settings.accessKey,
    );
    const userId = await apiClient.createUser(`react-native-demo-${uuid()}`);

    console.log('created user with id ', userId);

    await asyncStorage.setItem('userId', userId);

    return userId;
  } catch (e) {
    console.error('cannot create a user', e, settings);
    throw e;
  }
});

const $bridgeToken = atom(async get => {
  const settings = await get(selectedSettings);
  const productSettings = get(productSettingsState);
  const apiClient = new TruvApiClient(
    settings.apiHost,
    settings.clientId,
    settings.accessKey,
  );
  const userId = await get(userIdState);

  console.log('creating bridge token for user ', userId);

  try {
    const bridgeToken = await apiClient.getBridgeToken(userId, productSettings);

    console.log('got bridge token', bridgeToken);

    return bridgeToken;
  } catch (e) {
    console.error('error getting bridge token', e);
    throw e;
  }
});

const $bridgeTokenLoadable = loadable($bridgeToken);

export const useBridgeToken = () => {
  return useAtomValue($bridgeTokenLoadable);
};

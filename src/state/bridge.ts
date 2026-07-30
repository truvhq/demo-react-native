import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import {productSettingsState} from './product';
import {readSelectedSettings} from './settings';
import {consoleState} from './console';
import {TruvApiClient, TruvApiError} from '../api/truv';
import {atom, useAtomValue} from 'jotai';

type UserSession = {
  userId: string;
  contextKey: string;
};

const $userSessionState = atom<UserSession | null>(null);
const $bridgeTokenState = atom<string | null>(null);

const requestErrorMessage = (action: string, error: unknown): string => {
  if (error instanceof TruvApiError) {
    return `${action} error (HTTP ${error.statusCode}): ${error.body}`;
  }
  return `${action} error: ${
    error instanceof Error ? error.message : String(error)
  }`;
};

export const openBridgeAction = atom(
  null,
  async (get, set): Promise<string | null> => {
    const settings = await readSelectedSettings();
    const log = (message: string) =>
      set(consoleState, prev => [...prev, message]);

    if (!settings.clientId || !settings.accessKey) {
      log("Can't open Truv Bridge: access key or client ID is empty");
      return null;
    }

    const apiClient = new TruvApiClient(
      settings.apiHost,
      settings.clientId,
      settings.accessKey,
      log,
    );
    const contextKey = `${settings.apiHost}|${settings.clientId}|${settings.accessKey}`;

    const session = get($userSessionState);
    if (session && session.contextKey !== contextKey) {
      set($userSessionState, null);
    }
    let userId =
      session && session.contextKey === contextKey ? session.userId : null;

    if (!userId) {
      try {
        userId = await apiClient.createUser(`react-native-demo-${uuid()}`);
        set($userSessionState, {userId, contextKey});
        log(`User created with id: ${userId}`);
      } catch (e) {
        log(requestErrorMessage('User creation', e));
        return null;
      }
    }

    try {
      const bridgeToken = await apiClient.getBridgeToken(
        userId,
        get(productSettingsState),
      );
      log(`Got bridge token: ${bridgeToken}`);
      set($bridgeTokenState, bridgeToken);
      return bridgeToken;
    } catch (e) {
      log(requestErrorMessage('Bridge token', e));
      return null;
    }
  },
);

export const useBridgeToken = () => {
  return useAtomValue($bridgeTokenState);
};

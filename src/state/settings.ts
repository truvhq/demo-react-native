import asyncStorage from '@react-native-async-storage/async-storage';
import { AtomEffect, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const asyncStorageEffect =
  (key: string): AtomEffect<any> =>
  ({ setSelf, onSet }) => {
    setSelf(
      asyncStorage
        .getItem(key)
        .then((data: string | null) => (data ? JSON.parse(data) : ''))
        .catch(() => null)
    );
    onSet((newValue, _, isReset) => {
      isReset ? asyncStorage.removeItem(key) : asyncStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const envState = atom<keyof AccessKeys>({
  key: 'envState',
  default: asyncStorage.getItem('env').then((data) => (data ? JSON.parse(data) : 'sandbox')),
  effects: [asyncStorageEffect('env')],
});

export const useEnv = () => {
  return useRecoilState(envState);
};

export const clientIdState = atom<string>({
  key: 'clientIdState',
  default: asyncStorage.getItem('clientId').then((data) => (data ? JSON.parse(data) : '')),
  effects: [asyncStorageEffect('clientId')],
});

export const useClientId = () => {
  const [clientId, setClientId] = useRecoilState(clientIdState);

  return [clientId, setClientId] as const;
};

export type AccessKeys = {
  sandbox: string;
  dev: string;
  prod: string;
};

export const accessKeysState = atom<AccessKeys>({
  key: 'accessKeys',
  default: asyncStorage.getItem('accessKeys').then((data) => (data ? JSON.parse(data) : {})),
  effects: [asyncStorageEffect('accessKeys')],
});

export const useAccessKeys = () => {
  const [accessKeys, setAccessKeys] = useRecoilState(accessKeysState);

  return [accessKeys, setAccessKeys] as const;
};

export const selectedSettings = selector({
  key: 'selectedSettings',
  get: ({ get }) => {
    const clientId = get(clientIdState);
    const env = get(envState);
    const accessKeys = get(accessKeysState);
    const key = accessKeys[env as keyof AccessKeys];

    return {
      clientId,
      accessKey: key,
    };
  },
});

export const useSelectedSettings = () => {
  return useRecoilValue(selectedSettings);
};

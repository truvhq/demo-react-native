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
  default: 'sandbox',
  effects: [asyncStorageEffect('env')],
});

export const useEnv = () => {
  return useRecoilState(envState);
};

export const clientIdState = atom<string>({
  key: 'clientIdState',
  default: '',
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

const defaultAccessKeys: AccessKeys = {
  sandbox: '',
  dev: '',
  prod: '',
};

export const accessKeysState = atom<AccessKeys>({
  key: 'accessKeys',
  default: defaultAccessKeys,
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

    return {
      clientId,
      accessKey: accessKeys[env as keyof AccessKeys],
    };
  },
});

export const useSelectedSettings = () => {
  return useRecoilValue(selectedSettings);
};

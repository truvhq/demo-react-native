import { useEffect } from 'react';

import asyncStorage from '@react-native-async-storage/async-storage';
import { atom, useRecoilState } from 'recoil';

const envState = atom<'sandbox' | 'dev' | 'prod'>({
  key: 'envState',
  default: 'sandbox',
});

export const useEnv = () => {
  return useRecoilState(envState);
};

const clientIdState = atom<string>({
  key: 'clientIdState',
  default: '',
});

export const useClientId = () => {
  const [clientId, setClientId] = useRecoilState(clientIdState);

  useEffect(() => {
    asyncStorage.getItem('clientId').then((data: string | null) => {
      if (data) {
        setClientId(data);
      }
    });
  }, []);

  useEffect(() => {
    asyncStorage.setItem('clientId', clientId);
  }, [clientId]);

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

const accessKeysState = atom<AccessKeys>({
  key: 'accessKeys',
  default: defaultAccessKeys,
});

export const useAccessKeys = () => {
  const [accessKeys, setAccessKeys] = useRecoilState(accessKeysState);

  useEffect(() => {
    asyncStorage.getItem('accessKeys').then((data: string | null) => {
      if (data) {
        const values = JSON.parse(data);

        setAccessKeys({ ...defaultAccessKeys, ...values });
      }
    });
  }, []);

  useEffect(() => {
    asyncStorage.setItem('accessKeys', JSON.stringify(accessKeys));
  }, [accessKeys]);

  return [accessKeys, setAccessKeys] as const;
};

export const useSelectedSettings = () => {
  const [env] = useEnv();
  const [clientId] = useClientId();
  const [accessKeys] = useAccessKeys();

  return {
    clientId,
    accessKey: accessKeys[env],
  };
};

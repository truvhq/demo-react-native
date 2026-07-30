import asyncStorage from '@react-native-async-storage/async-storage';
import {atomWithStorage, createJSONStorage, atomFamily} from 'jotai/utils';
import {useAtom} from 'jotai';

const stringStorage = createJSONStorage<string>(() => asyncStorage);
const accessKeysStorage = createJSONStorage<AccessKeys>(() => asyncStorage);

const backendKey = 'backend';
const defaultBackend = 'prod';
const envKey = (backend: string) => `env-${backend}`;
const defaultEnv = 'sandbox';
const clientIdKey = (backend: string) => `clientId-${backend}`;
const accessKeysKey = (backend: string) => `accessKeys-${backend}`;
const defaultAccessKeys: AccessKeys = {
  sandbox: '',
  dev: '',
  prod: '',
};

const backendState = atomWithStorage<string>(
  backendKey,
  defaultBackend,
  stringStorage,
);
export const useBackend = () => {
  return useAtom(backendState);
};

const envState = atomFamily((backend: string) =>
  atomWithStorage<string>(envKey(backend), defaultEnv, stringStorage),
);

export const useEnv = () => {
  const [backend] = useAtom(backendState);
  return useAtom(envState(backend));
};

export const clientIdState = atomFamily((backend: string) =>
  atomWithStorage<string>(clientIdKey(backend), '', stringStorage),
);

export const useClientId = () => {
  const [backend] = useAtom(backendState);
  const [clientId, setClientId] = useAtom(clientIdState(backend));

  return [clientId, setClientId] as const;
};

export type AccessKeys = {
  sandbox: string;
  dev: string;
  prod: string;
};

export const accessKeysState = atomFamily((backend: string) =>
  atomWithStorage<AccessKeys>(
    accessKeysKey(backend),
    defaultAccessKeys,
    accessKeysStorage,
  ),
);

export const useAccessKeys = () => {
  const [backend] = useAtom(backendState);
  const [accessKeys, setAccessKeys] = useAtom(accessKeysState(backend));

  return [accessKeys, setAccessKeys] as const;
};

const apiHostMap: Record<string, string> = {
  prod: 'https://prod.truv.com',
  dev: 'https://dev.truv.com',
  stage: 'https://stage.truv.com',
};

const cdnHostMap: Record<string, string> = {
  prod: 'https://cdn.truv.com',
  dev: 'https://cdn-dev.truv.com',
  stage: 'https://cdn-stage.truv.com',
};

const orderUrlMap: Record<string, string> = {
  prod: 'https://my.truv.com',
  stage: 'https://my-stage.truv.com',
  dev: 'https://my-dev.truv.com',
};

export const useCdnHost = () => {
  const [backend] = useAtom(backendState);

  return cdnHostMap[backend];
};

export type TruvConfig = {
  apiUrl?: string;
  cdnUrl?: string;
  orderUrl?: string;
  orderEnvironment?: string;
  isDebug?: boolean;
};

export const useTruvConfig = (): TruvConfig => {
  const [backend] = useAtom(backendState);
  return {
    apiUrl: apiHostMap[backend],
    cdnUrl: cdnHostMap[backend],
    orderUrl: orderUrlMap[backend],
    isDebug: true,
  };
};

export const readSelectedSettings = async () => {
  const backend = await stringStorage.getItem(backendKey, defaultBackend);
  const clientId = await stringStorage.getItem(clientIdKey(backend), '');
  const env = await stringStorage.getItem(envKey(backend), defaultEnv);
  const accessKeys = await accessKeysStorage.getItem(
    accessKeysKey(backend),
    defaultAccessKeys,
  );
  const key = accessKeys[env as keyof AccessKeys];

  return {
    clientId,
    accessKey: key,
    apiHost: apiHostMap[backend],
    cdnHost: cdnHostMap[backend],
  };
};

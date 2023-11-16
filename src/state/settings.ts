import asyncStorage from '@react-native-async-storage/async-storage';
import {atomWithStorage, createJSONStorage, atomFamily} from 'jotai/utils';
import {atom, useAtom} from 'jotai';

const stringStorage = createJSONStorage<string>(() => asyncStorage);
const accessKeysStorage = createJSONStorage<AccessKeys>(() => asyncStorage);

const backendState = atomWithStorage<string>('backend', 'prod', stringStorage);
export const useBackend = () => {
  return useAtom(backendState);
};

const envState = atomFamily((backend: string) =>
  atomWithStorage<string>(`env-${backend}`, 'sandbox', stringStorage),
);

export const useEnv = () => {
  const [backend] = useAtom(backendState);
  return useAtom(envState(backend));
};

export const clientIdState = atomFamily((backend: string) =>
  atomWithStorage<string>(`clientId-${backend}`, '', stringStorage),
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
    `accessKeys-${backend}`,
    {
      sandbox: '',
      dev: '',
      prod: '',
    },
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

export const useCdnHost = () => {
  const [backend] = useAtom(backendState);

  return cdnHostMap[backend];
};

export const selectedSettings = atom(async get => {
  const backend = await get(backendState);
  const clientId = await get(clientIdState(backend));
  const env = await get(envState(backend));
  const accessKeys = await get(accessKeysState(backend));
  const key = accessKeys[env as keyof AccessKeys];

  console.log('new selected settings', {backend, clientId, env, key});

  return {
    clientId,
    accessKey: key,
    apiHost: apiHostMap[backend],
    cdnHost: cdnHostMap[backend],
  };
});

export const useSelectedSettings = () => {
  return useAtom(selectedSettings);
};

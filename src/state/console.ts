import {atom, useAtom} from 'jotai';

const consoleState = atom<string[]>([]);

export const useConsole = () => {
  const [console, setConsole] = useAtom(consoleState);

  return {
    console,
    log: (value: string) => {
      setConsole([...console, value]);
    },
  };
};

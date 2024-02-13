import {atom, useAtom} from 'jotai';

const consoleState = atom<string[]>([]);

export const useConsole = () => {
  const [console, setConsole] = useAtom(consoleState);

  return {
    console,
    addLog: (value: string) => {
      setConsole(state => [...state, value]);
    },
  };
};

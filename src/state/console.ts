import { atom, useRecoilState } from "recoil";

const consoleState = atom<string[]>({
  key: 'consoleState',
  default: [],
});

export const useConsole = () => {
  const [console, setConsole] = useRecoilState(consoleState);

  return {
    console,
    log: (value: string) => {
      setConsole([...console, value]);
    },
  };
};
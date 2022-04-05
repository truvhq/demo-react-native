declare module '*.svg' {
  const svg: any;

  export default svg;
}

export type ProcessEnv = {
  TRUV_WIDGET_URL: string;
  TRUV_API_HOST: string;
  ENV: 'dev' | 'prod';
};

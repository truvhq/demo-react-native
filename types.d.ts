declare module '*.svg' {
  const svg: any;
  export default svg;
}

export interface ProcessEnv {
  CITADEL_WIDGET_URL: string;
  CITADEL_API_HOST: string;
  CITADEL_ACCESS_KEY: string;
  CITADEL_CLIENT_ID: string;
  ENV: 'dev' | 'prod';
}
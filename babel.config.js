module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'inline-dotenv',
    'react-native-reanimated/plugin',
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
    './babel-plugin-import-meta.js',
  ],
};

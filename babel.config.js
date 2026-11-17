module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'inline-dotenv',
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
    './babel-plugin-import-meta.js',
    // Reanimated 4: the worklets plugin replaces react-native-reanimated/plugin
    // and must be listed last.
    'react-native-worklets/plugin',
  ],
};

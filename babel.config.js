module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'inline-dotenv',
    'react-native-reanimated/plugin',
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
  ],
};

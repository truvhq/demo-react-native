# Truv React Native Demo

This demo app is based on the [Expo framework](https://docs.expo.dev).

### How to use

```
# install dependencies
yarn

# start the app (in expo)
yarn start

```

Then press `i` to open in iOs emulator or use `Expo Go` app to run it on your iOS or Android device

## Development
Most likely you want to use the local version of some packages. 
Use this command for it `npm run link-lib` with 2 agrs: 1 - name of package, 2 - path to local version
example: npm run link-lib @truv/react-native /Users/sergnek/Documents/projects/citadel/bridge/packages/react-native
FYI. we don't use `yarn link` here because metro works bad with symlinks + we need to resolve the same dependencies in different folders manually

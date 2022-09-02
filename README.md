# Context Launcher

Context Launcher is an Android list-based launcher made to be simple and straight forward to use.

## Links

- [React Native Directory](https://reactnative.directory/) to search for RN libraries
- [React Native Hooks](https://github.com/react-native-community/hooks)
- [React Native Typescript Template](https://github.com/react-native-community/react-native-template-typescript)

## Tools

- Use [rnx-kit](https://microsoft.github.io/rnx-kit/) and [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) to help with upgrading React Native

## Snippets

- Check if RN uses Hermes:

  ```javascript
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
  ```

## Commands

- Run the app (debug variant): `npm run android`
- Run the app (release variant): `npm run android -- --variant release`
- Open up the debugging menu: `adb shell input keyevent 82`

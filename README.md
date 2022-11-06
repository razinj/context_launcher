# Context Launcher

Context Launcher is an Android list-based launcher made to be simple and straight forward to use.

[![Google Play Store](https://img.shields.io/endpoint?color=green&label=Google%20Play%20Store&logo=google-play&url=https://play.cuzi.workers.dev/play?i=com.razinj.context_launcher&m=v$version)](https://play.google.com/store/apps/details?id=com.razinj.context_launcher)

![Screenshots](https://public.razinj.com/context-launcher-screenshots.png)

## Links

- [React Native Directory](https://reactnative.directory/) to search for RN libraries
- [React Native Hooks](https://github.com/react-native-community/hooks)
- [React Native Typescript Template](https://github.com/react-native-community/react-native-template-typescript)
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/index.html)
- [IconKitchen](https://icon.kitchen/)

## Tools

- Use [rnx-kit](https://microsoft.github.io/rnx-kit/) and [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) to help with upgrading React Native

## Snippets

- Check if RN uses Hermes:

  ```javascript
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
  ```

## Commands

- Run the app (debug variant): `npm i && npm run android`
- Run the app (release variant): `npm run android -- --variant release`
- Open up the debugging menu: `adb shell input keyevent 82`

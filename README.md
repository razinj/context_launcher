# Context Launcher

Context Launcher is an Android list-based launcher made to be simple and straight forward to use.

## Useful snippets

- Check if RN uses Hermes:

  ```javascript
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
  ```

## Useful commands

- Run the app (debug variant): `npm run android`
- Run the app (release variant): `npm run android -- --variant release`
- Open up the debugging menu: `adb shell input keyevent 82`

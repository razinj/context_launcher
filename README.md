# Context Launcher

Context Launcher is an Android list-based launcher made to be simple and straight forward to use.

![Tux, the Linux mascot](/assets/Context_Launcher_Preview.jpg)

## FAQ

**Why build it?**

Because I find myself use the search functionality in my device to find apps instead of sliding screens, and searching is not that easy because searching requires to open an app first, which is not efficient - then the decision was made.

**Why build it with React Native?**

Because I want to learn and get better in React and React Native w/ Typescript, I believe in learning by building, practice makes perfect.

**What's inside?**

- React Native and native communications
  - Native modules: `AppsModule` is used to get the list of apps on device and launch few activities (open/uninstall an app, etc).
  - Events: `packageChange` is an event which the native is sending to React Native as a notification when a package changes (new app installed, uninstalled, updated, etc).
- Redux and related packages: are used for state management and persistence (store settings, recent apps, favorite apps, etc)
- React Context: for state management that doesn't require persistence (search query for example)

**What's missing?**

The app currently needs some UI improvements and lacks unit tests along with a general performance improvements.

## Useful commands

- Run the app: `npm run android`

- Open up the debugging menu: `adb shell input keyevent 82`

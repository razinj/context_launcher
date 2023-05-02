# Context Launcher

Context Launcher is an Android list-based launcher made to be simple, practical and straight forward to use.

<a href='https://play.google.com/store/apps/details?id=com.razinj.context_launcher&utm_source=github_readme&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="200"/></a>

Become a [tester](https://play.google.com/apps/testing/com.razinj.context_launcher).

## Preview

![Screenshots](https://public.razinj.com/context-launcher-screenshots.jpg)

## Run

Install dependencies:
  
```shell
# NPM
npm ci
# Gradle
cd android && ./gradlew build
```

Install and launch app in an android device/emulator:

```shell
npm run android
```

## Build

Debug `APK`:

```shell
cd android && ./gradlew assembleDebug
```

## Tests

Only RN/Jest are implemented at the moment.

Run:

```shell
npm run test
```

## Misc

Open up the debugging menu:

```shell
adb shell input keyevent 82
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=razinj/context_launcher&type=Date)](https://star-history.com/#razinj/context_launcher&Date)

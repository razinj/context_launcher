#!/usr/bin/env bash

cd ./android || exit

echo "[!] Current directory $(pwd)"

echo "[!] Started building release APK and AAB binaries"
./gradlew assembleRelease && ./gradlew bundleRelease
echo "[!] Completed building binaries"

echo "[!] APK location: $(pwd)/app/build/outputs/apk/release"
ls -l app/build/outputs/apk/release
echo "[!] AAB location: $(pwd)/app/build/outputs/bundle/release"
ls -l app/build/outputs/bundle/release

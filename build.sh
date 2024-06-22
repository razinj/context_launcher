#!/usr/bin/env bash

# Exit on CTRL+C
trap "exit" INT

GREEN_COLOR="\033[0;32m"
END_COLOR="\033[0m"

print_log() {
  echo -e "----------------------------------------------------------------------"
  echo -e "${GREEN_COLOR}[!] $1${END_COLOR}\n"
}

cd ./android || exit

print_log "Current directory $(pwd)"

print_log "Started building debug APK binary"
./gradlew assembleDebug

print_log "Started building release APK and AAB binaries"
./gradlew assembleRelease
./gradlew bundleRelease

print_log "Completed building binaries"

print_log "Debug APK location: $(pwd)/app/build/outputs/apk/debug"
ls -l app/build/outputs/apk/debug | grep ".apk"

print_log "Release APK location: $(pwd)/app/build/outputs/apk/release"
ls -l app/build/outputs/apk/release | grep ".apk"

print_log "Release AAB location: $(pwd)/app/build/outputs/bundle/release"
ls -l app/build/outputs/bundle/release | grep ".aab"

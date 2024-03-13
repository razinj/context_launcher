package com.razinj.context_launcher;

import static com.razinj.context_launcher.Constants.INTENT_PACKAGE_SCHEME;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_EVENT_NAME;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_EVENT_NAME_X;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_EVENT_PACKAGE_NAME;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_INTENT_ACTION;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.content.pm.LauncherActivityInfo;
import android.content.pm.LauncherApps;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.UserHandle;
import android.os.UserManager;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class LauncherAppsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private BroadcastReceiver launcherAppsChangeReceiverReceiver;

    LauncherAppsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        registerLauncherAppsChangeReceiver();
    }

    @NonNull
    @Override
    public String getName() {
        return "LauncherAppsModule";
    }

    @Override
    public void onCatalystInstanceDestroy() {
        reactContext.unregisterReceiver(launcherAppsChangeReceiverReceiver);
        launcherAppsChangeReceiverReceiver = null;
        Log.i("NIZ", "registerLauncherAppsChangeReceiver NOT OK");
    }

    private void registerLauncherAppsChangeReceiver() {
        Log.i("NIZ", "registerLauncherAppsChangeReceiver OK");
        launcherAppsChangeReceiverReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Log.i("NIZ", "LauncherAppsModule got something");
                Bundle extras = intent.getExtras();
                WritableMap map = Arguments.createMap();

                map.putString(PACKAGE_CHANGE_EVENT_PACKAGE_NAME, extras.getString(PACKAGE_CHANGE_EVENT_PACKAGE_NAME));
                map.putBoolean(PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED, extras.getBoolean(PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED));

                reactContext.getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter.class)).emit(PACKAGE_CHANGE_EVENT_NAME, map);
            }
        };

        reactContext.registerReceiver(launcherAppsChangeReceiverReceiver, new IntentFilter(PACKAGE_CHANGE_INTENT_ACTION));
    }

    @ReactMethod
    public void getApplications(Promise promise) {
        UserManager userManager = (UserManager) reactContext.getSystemService(Context.USER_SERVICE);
        LauncherApps launcherApps = (LauncherApps) reactContext.getSystemService(Context.LAUNCHER_APPS_SERVICE);
        List<AppDetails> apps = new ArrayList<>();

        // TODO: Get apps of current userHandle!?
        for (UserHandle userHandle : userManager.getUserProfiles()) {
            List<LauncherActivityInfo> activityList = launcherApps.getActivityList(null, userHandle);

            for (LauncherActivityInfo launcherActivityInfo : activityList) {
                ApplicationInfo applicationInfo = launcherActivityInfo.getApplicationInfo();

                if (applicationInfo.packageName.equals(BuildConfig.APPLICATION_ID)) {
                    continue;
                }

                apps.add(
                        new AppDetails(
                                applicationInfo.packageName,
                                launcherActivityInfo.getLabel().toString(),
                                Utils.getEncodedIcon(launcherActivityInfo.getIcon(0))
                        )
                );
            }
        }

        promise.resolve(apps.toString());
    }

    @ReactMethod
    public void getApplicationsV2(Callback callback) {
        UserManager userManager = (UserManager) reactContext.getSystemService(Context.USER_SERVICE);
        LauncherApps launcherApps = (LauncherApps) reactContext.getSystemService(Context.LAUNCHER_APPS_SERVICE);
        List<AppDetails> apps = new ArrayList<>();

        // TODO: Get apps of current userHandle!?
        for (UserHandle userHandle : userManager.getUserProfiles()) {
            List<LauncherActivityInfo> activityList = launcherApps.getActivityList(null, userHandle);

            for (LauncherActivityInfo launcherActivityInfo : activityList) {
                ApplicationInfo applicationInfo = launcherActivityInfo.getApplicationInfo();

                if (applicationInfo.packageName.equals(BuildConfig.APPLICATION_ID)) {
                    continue;
                }

                apps.add(
                        new AppDetails(
                                applicationInfo.packageName,
                                launcherActivityInfo.getLabel().toString(),
                                Utils.getEncodedIcon(launcherActivityInfo.getIcon(0))
                        )
                );
            }
        }

        callback.invoke(apps.toString());
    }

    @ReactMethod
    public void getApplicationsV3() {
        UserManager userManager = (UserManager) reactContext.getSystemService(Context.USER_SERVICE);
        LauncherApps launcherApps = (LauncherApps) reactContext.getSystemService(Context.LAUNCHER_APPS_SERVICE);
        List<AppDetails> apps = new ArrayList<>();

        // TODO: Get apps of current userHandle!?
        for (UserHandle userHandle : userManager.getUserProfiles()) {
            List<LauncherActivityInfo> activityList = launcherApps.getActivityList(null, userHandle);

            for (LauncherActivityInfo launcherActivityInfo : activityList) {
                ApplicationInfo applicationInfo = launcherActivityInfo.getApplicationInfo();

                if (applicationInfo.packageName.equals(BuildConfig.APPLICATION_ID)) {
                    continue;
                }

                apps.add(
                        new AppDetails(
                                applicationInfo.packageName,
                                launcherActivityInfo.getLabel().toString(),
                                Utils.getEncodedIcon(launcherActivityInfo.getIcon(0))
                        )
                );
            }
        }

//        promise.resolve(apps.toString());
        reactContext.getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter.class)).emit(PACKAGE_CHANGE_EVENT_NAME_X, apps.toString());
    }

    @ReactMethod
    private void launchApplication(String packageName) {
        Intent intent = reactContext.getPackageManager().getLaunchIntentForPackage(packageName);

        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void showApplicationDetails(String packageName) {
        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setData(Uri.fromParts(INTENT_PACKAGE_SCHEME, packageName, null));

        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void requestApplicationUninstall(String packageName) {
        Intent intent = new Intent(Intent.ACTION_DELETE);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setData(Uri.fromParts(INTENT_PACKAGE_SCHEME, packageName, null));

        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Required for NativeEventEmitter
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Required for NativeEventEmitter
    }

    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();

        constants.put("appId", BuildConfig.APPLICATION_ID);
        constants.put("appVersion", BuildConfig.VERSION_NAME);
        constants.put("buildNumber", BuildConfig.VERSION_CODE);
        constants.put("isDebugBuild", BuildConfig.DEBUG ? Boolean.TRUE : Boolean.FALSE);

        return constants;
    }
}

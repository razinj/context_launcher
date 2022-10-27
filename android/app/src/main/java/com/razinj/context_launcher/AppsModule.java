package com.razinj.context_launcher;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AppsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    private BroadcastReceiver packageChangeBroadcastReceiver;
    private static DeviceEventManagerModule.RCTDeviceEventEmitter rctDeviceEventEmitter;

    // TODO: Can these values be in a separate file?
    // Package change intent action
    public static String PACKAGE_UPDATE_ACTION = "packageUpdateAction";
    // Package change event
    public static String PACKAGE_CHANGE_EVENT = "packageChange";
    public static String PACKAGE_CHANGE_NAME = "packageName";
    public static String PACKAGE_CHANGE_IS_REMOVED = "isRemoved";

    AppsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        initializePackageChangeBroadcastReceiver(reactContext);
    }

    private void initializePackageChangeBroadcastReceiver(ReactApplicationContext reactContext) {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(PACKAGE_UPDATE_ACTION);

        packageChangeBroadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (rctDeviceEventEmitter == null) {
                    rctDeviceEventEmitter = reactContext.getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter.class));
                }

                Bundle extras = intent.getExtras();
                sendPackageChangeEvent((String) extras.get(PACKAGE_CHANGE_NAME), (Boolean) extras.get(PACKAGE_CHANGE_IS_REMOVED));
            }
        };

        this.reactContext.registerReceiver(packageChangeBroadcastReceiver, intentFilter);
    }

    @Override
    public void onCatalystInstanceDestroy() {
        this.reactContext.unregisterReceiver(packageChangeBroadcastReceiver);
    }

    @NonNull
    @Override
    public String getName() {
        return "AppsModule";
    }

    private static class AppDetails {
        CharSequence name;
        CharSequence label;

        AppDetails(CharSequence name, CharSequence label) {
            this.name = name;
            this.label = label;
        }

        @NonNull
        public String toString() {
            return "{\"label\":\"" + this.label + "\",\"name\":\"" + this.name + "\"}";
        }
    }

    @ReactMethod
    public void getApplications(Callback callBack) {
        List<AppDetails> apps = new ArrayList<>();
        List<PackageInfo> packages = this.reactContext
                .getPackageManager()
                .getInstalledPackages(0);

        for (final PackageInfo packageInfo : packages) {
            // TODO: Output a warning when package intent is null
            if (getPackageLaunchIntent(packageInfo.packageName) == null) continue;

            apps.add(new AppDetails(
                    packageInfo.packageName,
                    packageInfo.applicationInfo.loadLabel(this.reactContext.getPackageManager())
            ));
        }

        callBack.invoke(apps.toString());
    }

    @ReactMethod
    private void launchApplication(String packageName) {
        Intent intent = getPackageLaunchIntent(packageName);

        // TODO: Output error message and/or return an error to RN
        if (intent == null) return;

        this.reactContext.startActivity(intent);
    }

    @ReactMethod
    public void showApplicationDetails(String packageName) {
        startActivity(packageName, new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS));
    }

    @ReactMethod
    public void requestApplicationUninstall(String packageName) {
        startActivity(packageName, new Intent(Intent.ACTION_DELETE));
    }

    @ReactMethod
    public void getApplicationIcon(String packageName, Callback callBack) {
        callBack.invoke(Utils.getEncodedIcon(this.reactContext, packageName));
    }

    public static void sendPackageChangeEvent(String packageName, Boolean isRemoved) {
        WritableMap map = Arguments.createMap();
        map.putString(PACKAGE_CHANGE_NAME, packageName);
        map.putBoolean(PACKAGE_CHANGE_IS_REMOVED, isRemoved);

        rctDeviceEventEmitter.emit(PACKAGE_CHANGE_EVENT, map);
    }

    private void startActivity(String packageName, Intent intent) {
        // TODO: Check if the flag can be removed or not (read more about the behavior)
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setData(Uri.fromParts("package", packageName, null));

        this.reactContext.startActivity(intent);
    }

    private Intent getPackageLaunchIntent(String packageName) {
        return this.reactContext.getPackageManager().getLaunchIntentForPackage(packageName);
    }

    @ReactMethod
    public void addListener(String eventName) {
        // TODO: Should this method exist?
        // Set up any upstream listeners or background tasks as necessary
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // TODO: Should this method exist?
        // Remove upstream listeners, stop unnecessary background tasks
    }

    private PackageInfo getPackageInfo() throws Exception {
        return getReactApplicationContext().getPackageManager().getPackageInfo(getReactApplicationContext().getPackageName(), 0);
    }

    @Override
    public Map<String, Object> getConstants() {
        String appVersion, buildNumber, packageName;

        try {
            appVersion = getPackageInfo().versionName;
            buildNumber = Integer.toString(getPackageInfo().versionCode);
            packageName = getReactApplicationContext().getPackageName();
        } catch (Exception e) {
            appVersion = "unknown";
            buildNumber = "unknown";
            packageName = "unknown";
        }

        final Map<String, Object> constants = new HashMap<>();

        constants.put("appVersion", appVersion);
        constants.put("buildNumber", buildNumber);
        constants.put("packageName", packageName);

        return constants;
    }
}

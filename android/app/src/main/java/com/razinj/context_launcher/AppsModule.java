package com.razinj.context_launcher;

import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_EVENT;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_IS_REMOVED;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_NAME;
import static com.razinj.context_launcher.Constants.PACKAGE_UPDATE_ACTION;
import static com.razinj.context_launcher.Constants.SHORT_NOT_AVAILABLE;
import static com.razinj.context_launcher.Utils.getPackageInfo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
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

public class AppsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private static BroadcastReceiver packageChangeBroadcastReceiver;

    AppsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        initializePackageChangeBroadcastReceiver();
    }

    @NonNull
    @Override
    public String getName() {
        return "AppsModule";
    }

    @Override
    public void onCatalystInstanceDestroy() {
        reactContext.unregisterReceiver(packageChangeBroadcastReceiver);
    }

    private void initializePackageChangeBroadcastReceiver() {
        packageChangeBroadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (!reactContext.hasActiveReactInstance()) return;

                Bundle extras = intent.getExtras();
                WritableMap map = Arguments.createMap();

                map.putString(PACKAGE_CHANGE_NAME, extras.getString(PACKAGE_CHANGE_NAME));
                map.putBoolean(PACKAGE_CHANGE_IS_REMOVED, extras.getBoolean(PACKAGE_CHANGE_IS_REMOVED));

                reactContext.getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter.class)).emit(PACKAGE_CHANGE_EVENT, map);
            }
        };

        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(PACKAGE_UPDATE_ACTION);

        reactContext.registerReceiver(packageChangeBroadcastReceiver, intentFilter);
    }

    @ReactMethod
    public void getApplications(Promise promise) {
        PackageManager pm = reactContext.getPackageManager();
        List<AppDetails> apps = new ArrayList<>();
        List<PackageInfo> packages;

        // Get installed packages
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            packages = pm.getInstalledPackages(PackageManager.PackageInfoFlags.of(0));
        } else {
            packages = pm.getInstalledPackages(0);
        }

        // Filter and map to AppDetails
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            apps = packages.stream().filter(packageInfo -> Objects.nonNull(pm.getLaunchIntentForPackage(packageInfo.packageName))).map(packageInfo -> new AppDetails(packageInfo.packageName, packageInfo.applicationInfo.loadLabel(pm).toString(), Utils.getEncodedIcon(pm, packageInfo.packageName))).collect(Collectors.toList());
        } else {
            for (PackageInfo packageInfo : packages) {
                if (Objects.isNull(pm.getLaunchIntentForPackage(packageInfo.packageName))) continue;

                apps.add(new AppDetails(packageInfo.packageName, packageInfo.applicationInfo.loadLabel(pm).toString(), Utils.getEncodedIcon(pm, packageInfo.packageName)));
            }
        }

        promise.resolve(apps.toString());
    }

    @ReactMethod
    private void launchApplication(String packageName) {
        Intent intent = reactContext.getPackageManager().getLaunchIntentForPackage(packageName);

        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void showApplicationDetails(String packageName) {
        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK).setData(Uri.fromParts("package", packageName, null));

        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void requestApplicationUninstall(String packageName) {
        Intent intent = new Intent(Intent.ACTION_DELETE).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK).setData(Uri.fromParts("package", packageName, null));

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
        String appVersion;
        String buildNumber;
        String packageName;

        try {
            appVersion = getPackageInfo(reactContext).versionName;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                buildNumber = Long.toString(getPackageInfo(reactContext).getLongVersionCode());
            } else {
                buildNumber = Long.toString(getPackageInfo(reactContext).versionCode);
            }
            packageName = getReactApplicationContext().getPackageName();
        } catch (PackageManager.NameNotFoundException e) {
            appVersion = SHORT_NOT_AVAILABLE;
            buildNumber = SHORT_NOT_AVAILABLE;
            packageName = SHORT_NOT_AVAILABLE;
        }

        Map<String, Object> constants = new HashMap<>();

        constants.put("appVersion", appVersion);
        constants.put("buildNumber", buildNumber);
        constants.put("packageName", packageName);

        return constants;
    }
}

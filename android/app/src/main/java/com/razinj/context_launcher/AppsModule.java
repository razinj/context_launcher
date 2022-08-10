package com.razinj.context_launcher;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;
import java.util.List;

public class AppsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private static DeviceEventManagerModule.RCTDeviceEventEmitter rctDeviceEventEmitter;

    public static String PACKAGE_UPDATE_ACTION = "packageUpdateAction";
    private BroadcastReceiver broadcastReceiver;

    AppsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        initializeBroadcastReceiver(reactContext);
    }


    private void initializeBroadcastReceiver(ReactApplicationContext reactContext) {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(PACKAGE_UPDATE_ACTION);

        broadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Bundle extras = intent.getExtras();

                if (rctDeviceEventEmitter == null) {
                    rctDeviceEventEmitter = reactContext.getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter.class));
                }

                sendEvent((String) extras.get("packageName"));
            }
        };
        this.reactContext.registerReceiver(broadcastReceiver, intentFilter);
    }

    @Override
    public void onCatalystInstanceDestroy() {
        this.reactContext.unregisterReceiver(broadcastReceiver);
    }

    @NonNull
    @Override
    public String getName() {
        return "AppsModule";
    }

    private static class AppDetails {
        CharSequence name;
        CharSequence label;

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
            if (getPackageLaunchIntent(packageInfo.packageName) == null) continue;

            AppDetails app = new AppDetails();

            app.name = packageInfo.packageName;
            app.label = packageInfo.applicationInfo.loadLabel(this.reactContext.getPackageManager());

            apps.add(app);
        }

        callBack.invoke(apps.toString());
    }

    @ReactMethod
    private void launchApplication(String packageName) {
        Intent intent = getPackageLaunchIntent(packageName);

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

    public static void sendEvent(String packageName) {
        assert rctDeviceEventEmitter != null;

        WritableMap map = Arguments.createMap();
        map.putString("packageName", packageName);

        rctDeviceEventEmitter.emit("packageChange", map);
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
        // Set up any upstream listeners or background tasks as necessary
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Remove upstream listeners, stop unnecessary background tasks
    }
}

package com.razinj.context_launcher;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.LauncherApps;
import android.os.IBinder;
import android.os.Process;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;

import java.util.Arrays;

public class AppProvider extends Service {
    private PackageChangeReceiver packageChangeReceiver;

    @Override
    public void onCreate() {
        final LauncherApps launcherApps = (LauncherApps) this.getSystemService(Context.LAUNCHER_APPS_SERVICE);
        assert launcherApps != null;

        launcherApps.registerCallback(new LauncherAppsCallback() {
            @Override
            public void onPackageAdded(String packageName, android.os.UserHandle user) {
                if (Process.myUserHandle().equals(user)) return;

                PackageChangeReceiver.handleEvent(AppProvider.this, Intent.ACTION_PACKAGE_ADDED, packageName, false);
            }

            @Override
            public void onPackageChanged(String packageName, android.os.UserHandle user) {
                if (Process.myUserHandle().equals(user)) return;

                PackageChangeReceiver.handleEvent(AppProvider.this, Intent.ACTION_PACKAGE_ADDED, packageName, true);
            }

            @Override
            public void onPackageRemoved(String packageName, android.os.UserHandle user) {
                if (Process.myUserHandle().equals(user)) return;

                PackageChangeReceiver.handleEvent(AppProvider.this, Intent.ACTION_PACKAGE_REMOVED, packageName, false);
            }

            @Override
            public void onPackagesAvailable(String[] packageNames, android.os.UserHandle user, boolean replacing) {
                if (Process.myUserHandle().equals(user)) return;

                PackageChangeReceiver.handleEvent(AppProvider.this, Intent.ACTION_MEDIA_MOUNTED, null, false);
            }

            @Override
            public void onPackagesUnavailable(String[] packageNames, android.os.UserHandle user, boolean replacing) {
                if (Process.myUserHandle().equals(user)) return;

                PackageChangeReceiver.handleEvent(AppProvider.this, Intent.ACTION_MEDIA_UNMOUNTED, null, false);
            }
        });

        packageChangeReceiver = new PackageChangeReceiver();

        IntentFilter appChangedFilter = new IntentFilter();
        appChangedFilter.addAction(Intent.ACTION_PACKAGE_ADDED);
        appChangedFilter.addAction(Intent.ACTION_PACKAGE_REMOVED);
        appChangedFilter.addAction(Intent.ACTION_MEDIA_MOUNTED);
        appChangedFilter.addAction(Intent.ACTION_MEDIA_REMOVED);
        appChangedFilter.addDataScheme("package");
        appChangedFilter.addDataScheme("file");

        this.registerReceiver(packageChangeReceiver, appChangedFilter);

        super.onCreate();
    }

    @Override
    public void onDestroy() {
        this.unregisterReceiver(packageChangeReceiver);
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}

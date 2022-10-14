package com.razinj.context_launcher;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.LauncherApps;
import android.os.Build;
import android.os.IBinder;
import android.os.Process;
import android.os.UserHandle;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

public class AppProvider extends Service {
    private PackageChangeReceiver packageChangeReceiver;

    @Override
    public void onCreate() {
        final LauncherApps launcherApps = (LauncherApps) this.getSystemService(Context.LAUNCHER_APPS_SERVICE);
        assert launcherApps != null;

        launcherApps.registerCallback(new LauncherAppsCallback() {
            @Override
            public void onPackageAdded(String packageName, UserHandle user) {
                if (user.equals(Process.myUserHandle())) return;

                PackageChangeReceiver.handleEvent(AppProvider.this, Intent.ACTION_PACKAGE_ADDED, packageName, false);
            }

            @Override
            public void onPackageChanged(String packageName, UserHandle user) {
                if (user.equals(Process.myUserHandle())) return;

                PackageChangeReceiver.handleEvent(AppProvider.this, Intent.ACTION_PACKAGE_CHANGED, packageName, true);
            }

            @Override
            public void onPackageRemoved(String packageName, UserHandle user) {
                if (user.equals(Process.myUserHandle())) return;

                PackageChangeReceiver.handleEvent(AppProvider.this, Intent.ACTION_PACKAGE_REMOVED, packageName, false);
            }

            @Override
            public void onPackagesAvailable(String[] packageNames, UserHandle user, boolean replacing) {
                if (user.equals(Process.myUserHandle())) return;

                PackageChangeReceiver.handleEvent(AppProvider.this, Intent.ACTION_MEDIA_MOUNTED, null, false);
            }

            @Override
            public void onPackagesUnavailable(String[] packageNames, UserHandle user, boolean replacing) {
                if (user.equals(Process.myUserHandle())) return;

                PackageChangeReceiver.handleEvent(AppProvider.this, Intent.ACTION_MEDIA_UNMOUNTED, null, false);
            }
        });

        this.packageChangeReceiver = new PackageChangeReceiver();

        IntentFilter appChangedIntentFilter = new IntentFilter();
        appChangedIntentFilter.addAction(Intent.ACTION_PACKAGE_ADDED);
        appChangedIntentFilter.addAction(Intent.ACTION_PACKAGE_CHANGED);
        appChangedIntentFilter.addAction(Intent.ACTION_PACKAGE_REMOVED);
        appChangedIntentFilter.addAction(Intent.ACTION_MEDIA_MOUNTED);
        appChangedIntentFilter.addAction(Intent.ACTION_MEDIA_REMOVED);
        appChangedIntentFilter.addDataScheme("package");
        appChangedIntentFilter.addDataScheme("file");

        this.registerReceiver(packageChangeReceiver, appChangedIntentFilter);

        super.onCreate();
        startForegroundCustom();
    }

    private void startForegroundCustom() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Notification channel
            String channelId = BuildConfig.APPLICATION_ID;
            String channelName = "AppProvider Service";
            NotificationChannel notificationChannel = new NotificationChannel(
                    channelId,
                    channelName,
                    NotificationManager.IMPORTANCE_NONE
            );
            notificationChannel.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);

            // Notification manager
            NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            assert notificationManager != null;
            notificationManager.createNotificationChannel(notificationChannel);

            // Notification builder
            NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, channelId);
            Notification notification = notificationBuilder
                    .setPriority(NotificationManager.IMPORTANCE_MIN)
                    .setCategory(Notification.CATEGORY_SERVICE)
                    .setOngoing(true)
                    .build();
            startForeground(1, notification);
        } else startForeground(2, new Notification());
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

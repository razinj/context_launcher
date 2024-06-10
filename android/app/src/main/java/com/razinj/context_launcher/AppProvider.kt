package com.razinj.context_launcher

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.LauncherApps
import android.os.Build
import android.os.IBinder
import android.os.Process
import android.os.UserHandle
import androidx.core.app.NotificationCompat

class AppProvider : Service() {
    private var packageChangeReceiver: PackageChangeReceiver? = null

    override fun onCreate() {
        val launcherApps = (getSystemService(LAUNCHER_APPS_SERVICE) as LauncherApps)
        launcherApps.registerCallback(object : LauncherAppsCallback() {
            override fun onPackageAdded(packageName: String, user: UserHandle) {
                if (user == Process.myUserHandle()) return

                PackageChangeReceiver.Companion.handleEvent(
                    this@AppProvider,
                    Intent.ACTION_PACKAGE_ADDED,
                    packageName,
                    false
                )
            }

            override fun onPackageChanged(packageName: String, user: UserHandle) {
                if (user == Process.myUserHandle()) return

                PackageChangeReceiver.Companion.handleEvent(
                    this@AppProvider,
                    Intent.ACTION_PACKAGE_CHANGED,
                    packageName,
                    true
                )
            }

            override fun onPackageRemoved(packageName: String, user: UserHandle) {
                if (user == Process.myUserHandle()) return

                PackageChangeReceiver.Companion.handleEvent(
                    this@AppProvider,
                    Intent.ACTION_PACKAGE_REMOVED,
                    packageName,
                    false
                )
            }
        })

        this.packageChangeReceiver = PackageChangeReceiver()

        val appChangedIntentFilter = IntentFilter()
        appChangedIntentFilter.addAction(Intent.ACTION_PACKAGE_ADDED)
        appChangedIntentFilter.addAction(Intent.ACTION_PACKAGE_CHANGED)
        appChangedIntentFilter.addAction(Intent.ACTION_PACKAGE_REMOVED)
        appChangedIntentFilter.addDataScheme("package")
        appChangedIntentFilter.addDataScheme("file")

        registerReceiver(packageChangeReceiver, appChangedIntentFilter)

        super.onCreate()

        startForegroundCustom()
    }

    private fun startForegroundCustom() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            startForeground(1, Notification())
            return
        }

        // Notification channel
        val channelId = BuildConfig.APPLICATION_ID
        val channelName = "AppProvider Channel"
        val notificationChannel = NotificationChannel(
            channelId,
            channelName,
            NotificationManager.IMPORTANCE_NONE
        )
        notificationChannel.lockscreenVisibility = Notification.VISIBILITY_PRIVATE

        // Notification manager
        val notificationManager = (getSystemService(NOTIFICATION_SERVICE) as NotificationManager)
        notificationManager.createNotificationChannel(notificationChannel)

        // Notification builder
        val notificationBuilder = NotificationCompat.Builder(this, channelId)
        val notification = notificationBuilder
            .setPriority(NotificationManager.IMPORTANCE_NONE)
            .setCategory(Notification.CATEGORY_SERVICE)
            .setAutoCancel(false)
            .setOngoing(true)
            .setSilent(true)
            .build()
        startForeground(1, notification)
    }

    override fun onDestroy() {
        this.unregisterReceiver(packageChangeReceiver)
        super.onDestroy()
    }

    override fun onBind(intent: Intent): IBinder? {
        return null
    }
}

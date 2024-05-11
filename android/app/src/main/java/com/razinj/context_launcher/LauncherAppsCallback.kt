package com.razinj.context_launcher

import android.content.pm.LauncherApps
import android.os.UserHandle

/**
 * Empty implementation of LauncherApps.Callback so we do not need to override all methods when
 * only parts of LauncherApps.Callback are needed.
 */
open class LauncherAppsCallback : LauncherApps.Callback() {
    override fun onPackageRemoved(packageName: String, user: UserHandle) {
    }

    override fun onPackageAdded(packageName: String, user: UserHandle) {
    }

    override fun onPackageChanged(packageName: String, user: UserHandle) {
    }

    override fun onPackagesAvailable(
        packageNames: Array<String>,
        user: UserHandle,
        replacing: Boolean
    ) {
    }

    override fun onPackagesUnavailable(
        packageNames: Array<String>,
        user: UserHandle,
        replacing: Boolean
    ) {
    }
}

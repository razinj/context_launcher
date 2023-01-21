package com.razinj.context_launcher;

import android.content.pm.LauncherApps;
import android.os.UserHandle;

/**
 * Empty implementation of LauncherApps.Callback so we do not need to override all methods when
 * only parts of LauncherApps.Callback are needed.
 */
public class LauncherAppsCallback extends LauncherApps.Callback {
    @Override
    public void onPackageRemoved(String packageName, UserHandle user) {
    }

    @Override
    public void onPackageAdded(String packageName, UserHandle user) {
    }

    @Override
    public void onPackageChanged(String packageName, UserHandle user) {
    }

    @Override
    public void onPackagesAvailable(String[] packageNames, UserHandle user, boolean replacing) {
    }

    @Override
    public void onPackagesUnavailable(String[] packageNames, UserHandle user, boolean replacing) {
    }
}

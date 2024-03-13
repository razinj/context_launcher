package com.razinj.context_launcher;

import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_EVENT_PACKAGE_NAME;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_INTENT_ACTION;

import android.content.Context;
import android.content.Intent;
import android.content.pm.LauncherApps;
import android.os.UserHandle;
import android.widget.Toast;

public class LauncherAppsCallback extends LauncherApps.Callback {
    private final Context context;

    public LauncherAppsCallback(Context context) {
        this.context = context;
    }

    @Override
    public void onPackageRemoved(String packageName, UserHandle user) {
        Toast.makeText(context, "onPackageRemoved: packageName: " + packageName, Toast.LENGTH_LONG).show();
        Intent intent = new Intent(PACKAGE_CHANGE_INTENT_ACTION);

        intent.putExtra(PACKAGE_CHANGE_EVENT_PACKAGE_NAME, packageName);
        intent.putExtra(PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED, true);

        context.sendBroadcast(intent);
    }

    @Override
    public void onPackageAdded(String packageName, UserHandle user) {
        Toast.makeText(context, "onPackageAdded: packageName: " + packageName, Toast.LENGTH_LONG).show();
        Intent intent = new Intent(PACKAGE_CHANGE_INTENT_ACTION);

        intent.putExtra(PACKAGE_CHANGE_EVENT_PACKAGE_NAME, packageName);
        intent.putExtra(PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED, false);

        context.sendBroadcast(intent);
    }

    @Override
    public void onPackageChanged(String packageName, UserHandle user) {
        Toast.makeText(context, "onPackageChanged: packageName: " + packageName, Toast.LENGTH_LONG).show();
        Intent intent = new Intent(PACKAGE_CHANGE_INTENT_ACTION);

        intent.putExtra(PACKAGE_CHANGE_EVENT_PACKAGE_NAME, packageName);
        intent.putExtra(PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED, false);

        context.sendBroadcast(intent);
    }

    @Override
    public void onPackagesAvailable(String[] packageNames, UserHandle user, boolean replacing) {
    }

    @Override
    public void onPackagesUnavailable(String[] packageNames, UserHandle user, boolean replacing) {
    }
}

package com.razinj.context_launcher;

import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_IS_REMOVED;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_NAME;
import static com.razinj.context_launcher.Constants.PACKAGE_UPDATE_ACTION;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import androidx.annotation.NonNull;

public class PackageChangeReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(@NonNull Context context, @NonNull Intent intent) {
        String packageName = intent.getData().getSchemeSpecificPart();

        if (packageName.equalsIgnoreCase(context.getPackageName())) return;

        handleEvent(context, intent.getAction(), packageName, intent.getBooleanExtra(Intent.EXTRA_REPLACING, false));
    }

    public static void handleEvent(Context context, @NonNull String action, String packageName, boolean replacing) {
        if (!action.equals(Intent.ACTION_PACKAGE_ADDED) && !action.equals(Intent.ACTION_PACKAGE_CHANGED) && !action.equals(Intent.ACTION_PACKAGE_REMOVED)) {
            return;
        }

        Intent intent = new Intent();
        intent.setAction(PACKAGE_UPDATE_ACTION);
        intent.putExtra(PACKAGE_CHANGE_NAME, packageName);

        if (action.equals(Intent.ACTION_PACKAGE_ADDED) || action.equals(Intent.ACTION_PACKAGE_CHANGED)) {
            Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
            // Ignore plugin apps
            if (launchIntent == null) return;

            intent.putExtra(PACKAGE_CHANGE_IS_REMOVED, Boolean.FALSE);
        } else if (replacing) {
            intent.putExtra(PACKAGE_CHANGE_IS_REMOVED, Boolean.FALSE);
        } else {
            intent.putExtra(PACKAGE_CHANGE_IS_REMOVED, Boolean.TRUE);
        }

        context.sendBroadcast(intent);
    }
}

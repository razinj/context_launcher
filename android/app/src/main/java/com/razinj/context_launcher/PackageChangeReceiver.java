package com.razinj.context_launcher;

import static com.razinj.context_launcher.AppsModule.PACKAGE_UPDATE_ACTION;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class PackageChangeReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String packageName = intent.getData().getSchemeSpecificPart();

        if (packageName.equalsIgnoreCase(context.getPackageName())) return;

        handleEvent(context, intent.getAction(), packageName, intent.getBooleanExtra(Intent.EXTRA_REPLACING, false));
    }

    public static void handleEvent(Context context, String action, String packageName, boolean replacing) {
        Log.i("PackageChangeReceiver", "handleEvent: packageName: " + packageName + ", replacing: " + replacing);

        Intent intent = new Intent();
        intent.setAction(PACKAGE_UPDATE_ACTION);
        intent.putExtra("packageName", packageName);

        if (Intent.ACTION_PACKAGE_ADDED.equals(action)) {
            Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
            // For some plugin apps
            if (launchIntent == null) return;
        }

        context.sendBroadcast(intent);
    }
}

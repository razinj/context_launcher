package com.razinj.context_launcher;

import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_EVENT_NAME;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_EVENT_PACKAGE_NAME;
import static com.razinj.context_launcher.Constants.PACKAGE_CHANGE_INTENT_ACTION;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.modules.core.DeviceEventManagerModule;

public class PackageChangeReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (action != null && action.equals(Intent.ACTION_PACKAGE_ADDED)) {
            // App installed
            String packageName = intent.getData().getEncodedSchemeSpecificPart();
            // Handle the app installation event
            Log.i("NIZ", "packageName added: " + packageName);
            Toast.makeText(context, "packageName added: " + packageName, Toast.LENGTH_LONG).show();
            Intent intentX = new Intent(PACKAGE_CHANGE_INTENT_ACTION);

            intentX.putExtra(PACKAGE_CHANGE_EVENT_PACKAGE_NAME, packageName);
            intentX.putExtra(PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED, false);

            context.sendBroadcast(intentX);
        } else if (action != null && action.equals(Intent.ACTION_PACKAGE_REMOVED)) {
            // App removed
            String packageName = intent.getData().getEncodedSchemeSpecificPart();
            // Handle the app removal event
            Log.i("NIZ", "packageName removed: " + packageName);
            Toast.makeText(context, "packageName removed: " + packageName, Toast.LENGTH_LONG).show();
            Intent intentX = new Intent(PACKAGE_CHANGE_INTENT_ACTION);

            intentX.putExtra(PACKAGE_CHANGE_EVENT_PACKAGE_NAME, packageName);
            intentX.putExtra(PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED, true);

            context.sendBroadcast(intentX);
        }
    }

}

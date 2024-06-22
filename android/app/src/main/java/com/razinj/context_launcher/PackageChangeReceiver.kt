package com.razinj.context_launcher

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class PackageChangeReceiver : BroadcastReceiver() {
    override fun onReceive(
        context: Context,
        intent: Intent,
    ) {
        val packageName = intent.data?.schemeSpecificPart
        val action = intent.action

        if (packageName == null || action == null) {
            return
        }
        if (packageName.equals(context.packageName, ignoreCase = true)) {
            return
        }

        handleEvent(
            context,
            action,
            packageName,
        )
    }

    companion object {
        fun handleEvent(
            context: Context,
            action: String,
            packageName: String,
        ) {
            if (action != Intent.ACTION_PACKAGE_ADDED &&
                action != Intent.ACTION_PACKAGE_CHANGED &&
                action != Intent.ACTION_PACKAGE_REMOVED
            ) {
                return
            }

            val intent = Intent()
            intent.setAction(Constants.PACKAGE_UPDATE_ACTION)
            intent.putExtra(Constants.PACKAGE_CHANGE_NAME, packageName)

            if (action == Intent.ACTION_PACKAGE_ADDED || action == Intent.ACTION_PACKAGE_CHANGED) {
                // Ignore plugin apps
                context.packageManager.getLaunchIntentForPackage(packageName) ?: return

                intent.putExtra(Constants.PACKAGE_CHANGE_IS_REMOVED, false)
            } else {
                intent.putExtra(Constants.PACKAGE_CHANGE_IS_REMOVED, true)
            }

            context.sendBroadcast(intent)
        }
    }
}

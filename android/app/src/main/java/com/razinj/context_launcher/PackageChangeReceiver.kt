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
            intent.getBooleanExtra(Intent.EXTRA_REPLACING, false),
        )
    }

    companion object {
        fun handleEvent(
            context: Context,
            action: String,
            packageName: String,
            replacing: Boolean,
        ) {
            val intent = Intent()
            intent.setAction(Constants.PACKAGE_UPDATE_ACTION)
            intent.putExtra(Constants.PACKAGE_CHANGE_NAME, packageName)

            if (Intent.ACTION_PACKAGE_ADDED == action) {
                if (!replacing) {
                    intent.putExtra(Constants.PACKAGE_CHANGE_IS_REMOVED, false)
                }
            } else if (Intent.ACTION_PACKAGE_REMOVED == action) {
                if (!replacing) {
                    intent.putExtra(Constants.PACKAGE_CHANGE_IS_REMOVED, true)
                }
            } else {
                intent.putExtra(Constants.PACKAGE_CHANGE_IS_REMOVED, false)
            }

            context.sendBroadcast(intent)
        }
    }
}

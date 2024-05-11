package com.razinj.context_launcher

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class PackageChangeReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val packageName = intent.data!!.schemeSpecificPart

        if (packageName.equals(context.packageName, ignoreCase = true)) return

        handleEvent(
            context,
            intent.action!!,
            packageName,
            intent.getBooleanExtra(Intent.EXTRA_REPLACING, false)
        )
    }

    companion object {
        fun handleEvent(
            context: Context,
            action: String,
            packageName: String?,
            replacing: Boolean
        ) {
            if (action != Intent.ACTION_PACKAGE_ADDED && action != Intent.ACTION_PACKAGE_CHANGED && action != Intent.ACTION_PACKAGE_REMOVED) {
                return
            }

            val intent = Intent()
            intent.setAction(Constants.PACKAGE_UPDATE_ACTION)
            intent.putExtra(Constants.PACKAGE_CHANGE_NAME, packageName)

            if (action == Intent.ACTION_PACKAGE_ADDED || action == Intent.ACTION_PACKAGE_CHANGED) {
                val launchIntent = context.packageManager.getLaunchIntentForPackage(
                    packageName!!
                )
                // Ignore plugin apps
                if (launchIntent == null) return

                intent.putExtra(Constants.PACKAGE_CHANGE_IS_REMOVED, java.lang.Boolean.FALSE)
            } else if (replacing) {
                intent.putExtra(Constants.PACKAGE_CHANGE_IS_REMOVED, java.lang.Boolean.FALSE)
            } else {
                intent.putExtra(Constants.PACKAGE_CHANGE_IS_REMOVED, java.lang.Boolean.TRUE)
            }

            context.sendBroadcast(intent)
        }
    }
}

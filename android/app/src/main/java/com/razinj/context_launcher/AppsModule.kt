package com.razinj.context_launcher

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.provider.Settings
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.Objects
import java.util.stream.Collectors

class AppsModule internal constructor(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(
        reactContext
    ) {
    init {
        initializePackageChangeBroadcastReceiver()
    }

    override fun getName(): String {
        return "AppsModule"
    }

    override fun onCatalystInstanceDestroy() {
        reactContext.unregisterReceiver(packageChangeBroadcastReceiver)
    }

    private fun initializePackageChangeBroadcastReceiver() {
        packageChangeBroadcastReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                if (!reactContext.hasActiveReactInstance()) return

                val extras = intent.extras
                val map = Arguments.createMap()

                map.putString(
                    Constants.PACKAGE_CHANGE_NAME,
                    extras!!.getString(Constants.PACKAGE_CHANGE_NAME)
                )
                map.putBoolean(
                    Constants.PACKAGE_CHANGE_IS_REMOVED,
                    extras.getBoolean(Constants.PACKAGE_CHANGE_IS_REMOVED)
                )

                reactContext.getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter::class.java))
                    .emit(
                        Constants.PACKAGE_CHANGE_EVENT, map
                    )
            }
        }

        val intentFilter = IntentFilter()
        intentFilter.addAction(Constants.PACKAGE_UPDATE_ACTION)

        reactContext.registerReceiver(packageChangeBroadcastReceiver, intentFilter)
    }

    @ReactMethod
    fun getApplications(promise: Promise) {
        Thread {
            val pm = reactContext.packageManager
            var apps: MutableList<AppDetails?> = ArrayList()

            // Get installed packages
            val packages = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                pm.getInstalledPackages(PackageManager.PackageInfoFlags.of(0))
            } else {
                pm.getInstalledPackages(0)
            }

            // Filter and map to AppDetails
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                apps = packages.stream().filter { packageInfo: PackageInfo ->
                    Objects.nonNull(
                        pm.getLaunchIntentForPackage(packageInfo.packageName)
                    )
                }
                    .map { packageInfo: PackageInfo ->
                        AppDetails(
                            packageInfo.packageName,
                            packageInfo.applicationInfo.loadLabel(pm).toString(),
                            Utils.getEncodedIcon(pm, packageInfo.packageName)
                        )
                    }
                    .collect(Collectors.toList())
            } else {
                for (packageInfo in packages) {
                    if (Objects.isNull(pm.getLaunchIntentForPackage(packageInfo.packageName))) {
                        continue
                    }

                    apps.add(
                        AppDetails(
                            packageInfo.packageName,
                            packageInfo.applicationInfo.loadLabel(pm).toString(),
                            Utils.getEncodedIcon(pm, packageInfo.packageName)
                        )
                    )
                }
            }
            promise.resolve(apps.toString())
        }.start()
    }

    @ReactMethod
    private fun launchApplication(packageName: String) {
        val intent = reactContext.packageManager.getLaunchIntentForPackage(packageName)

        reactContext.startActivity(intent)
    }

    @ReactMethod
    fun showApplicationDetails(packageName: String?) {
        val intent =
            Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                .setData(
                    Uri.fromParts("package", packageName, null)
                )

        reactContext.startActivity(intent)
    }

    @ReactMethod
    fun requestApplicationUninstall(packageName: String?) {
        val intent = Intent(Intent.ACTION_DELETE).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK).setData(
            Uri.fromParts("package", packageName, null)
        )

        reactContext.startActivity(intent)
    }

    @ReactMethod
    fun addListener(eventName: String?) {
        // Required for NativeEventEmitter
    }

    @ReactMethod
    fun removeListeners(count: Int?) {
        // Required for NativeEventEmitter
    }

    override fun getConstants(): Map<String, Any>? {
        var appVersion: String?
        var buildNumber: String
        var packageName: String?

        try {
            appVersion = Utils.getPackageInfo(reactContext).versionName
            buildNumber = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                Utils.getPackageInfo(reactContext).longVersionCode.toString()
            } else {
                Utils.getPackageInfo(reactContext).versionCode.toString()
            }
            packageName = reactApplicationContext.packageName
        } catch (e: PackageManager.NameNotFoundException) {
            appVersion = Constants.SHORT_NOT_AVAILABLE
            buildNumber = Constants.SHORT_NOT_AVAILABLE
            packageName = Constants.SHORT_NOT_AVAILABLE
        }

        val constants: MutableMap<String, Any> = HashMap()

        constants["appVersion"] = appVersion!!
        constants["buildNumber"] = buildNumber
        constants["packageName"] = packageName!!

        return constants
    }

    companion object {
        private var packageChangeBroadcastReceiver: BroadcastReceiver? = null
    }
}

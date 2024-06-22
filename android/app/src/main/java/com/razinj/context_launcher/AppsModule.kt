package com.razinj.context_launcher

import android.annotation.SuppressLint
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
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

class AppsModule internal constructor(
    private val reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
    private var packageChangeBroadcastReceiver: BroadcastReceiver? = null

    init {
        initializePackageChangeBroadcastReceiver()
    }

    override fun getName(): String = "AppsModule"

    override fun invalidate() {
        reactContext.unregisterReceiver(packageChangeBroadcastReceiver)
    }

    private fun initializePackageChangeBroadcastReceiver() {
        packageChangeBroadcastReceiver =
            object : BroadcastReceiver() {
                override fun onReceive(
                    context: Context,
                    intent: Intent,
                ) {
                    if (!reactContext.hasActiveReactInstance()) return

                    val extras = intent.extras ?: return
                    val map = Arguments.createMap()

                    map.putString(
                        Constants.PACKAGE_CHANGE_NAME,
                        extras.getString(Constants.PACKAGE_CHANGE_NAME),
                    )
                    map.putBoolean(
                        Constants.PACKAGE_CHANGE_IS_REMOVED,
                        extras.getBoolean(Constants.PACKAGE_CHANGE_IS_REMOVED),
                    )

                    reactContext
                        .getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter::class.java))
                        .emit(
                            Constants.PACKAGE_CHANGE_EVENT,
                            map,
                        )
                }
            }

        val intentFilter = IntentFilter()
        intentFilter.addAction(Constants.PACKAGE_UPDATE_ACTION)

        @SuppressLint("UnspecifiedRegisterReceiverFlag") // Suppress lint warning in the else statement
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            reactContext.registerReceiver(
                packageChangeBroadcastReceiver,
                intentFilter,
                Context.RECEIVER_EXPORTED,
            )
        } else {
            reactContext.registerReceiver(packageChangeBroadcastReceiver, intentFilter)
        }
    }

    @ReactMethod
    fun getApplications(promise: Promise) {
        Thread {
            val pm = reactContext.packageManager
            val apps = mutableListOf<AppDetails>()

            val packages =
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                    pm.getInstalledPackages(PackageManager.PackageInfoFlags.of(0))
                } else {
                    pm.getInstalledPackages(0)
                }

            for (packageInfo in packages) {
                // Only use packages that are launch-able
                pm.getLaunchIntentForPackage(packageInfo.packageName) ?: continue

                apps.add(
                    AppDetails(
                        packageInfo.packageName,
                        packageInfo.applicationInfo.loadLabel(pm).toString(),
                        Utils.getEncodedIcon(pm, packageInfo.packageName),
                    ),
                )
            }

            promise.resolve(apps.toString())
        }.start()
    }

    @ReactMethod
    fun launchApplication(packageName: String) {
        val intent = reactContext.packageManager.getLaunchIntentForPackage(packageName)

        reactContext.startActivity(intent)
    }

    @ReactMethod
    fun showApplicationDetails(packageName: String) {
        val intent =
            Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                .setData(Uri.fromParts("package", packageName, null))

        reactContext.startActivity(intent)
    }

    @ReactMethod
    fun requestApplicationUninstall(packageName: String) {
        val intent =
            Intent(Intent.ACTION_DELETE)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                .setData(Uri.fromParts("package", packageName, null))

        reactContext.startActivity(intent)
    }

    @ReactMethod
    fun addListener(eventName: String) {
        // Required for NativeEventEmitter
        // See: https://github.com/facebook/react-native/commit/114be1d2170bae2d29da749c07b45acf931e51e2
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Required for NativeEventEmitter
        // See: https://github.com/facebook/react-native/commit/114be1d2170bae2d29da749c07b45acf931e51e2
    }

    override fun getConstants(): MutableMap<String, Any> {
        val constants: MutableMap<String, Any> = mutableMapOf()

        try {
            val packageInfo = Utils.getPackageInfo(reactContext)
            val appVersion = packageInfo.versionName
            val buildNumber =
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                    packageInfo.longVersionCode.toString()
                } else {
                    packageInfo.versionCode.toString()
                }
            val packageName = reactApplicationContext.packageName

            constants.apply {
                put("appVersion", appVersion ?: Constants.SHORT_NOT_AVAILABLE)
                put("buildNumber", buildNumber)
                put("packageName", packageName ?: Constants.SHORT_NOT_AVAILABLE)
            }
        } catch (e: PackageManager.NameNotFoundException) {
            constants.apply {
                put("appVersion", Constants.SHORT_NOT_AVAILABLE)
                put("buildNumber", Constants.SHORT_NOT_AVAILABLE)
                put("packageName", Constants.SHORT_NOT_AVAILABLE)
            }
        }

        return constants
    }
}

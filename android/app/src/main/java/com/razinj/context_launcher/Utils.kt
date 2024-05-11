package com.razinj.context_launcher

import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.Drawable
import android.os.Build
import android.util.Base64
import com.facebook.react.bridge.ReactApplicationContext
import java.io.ByteArrayOutputStream

object Utils {
    fun getEncodedIcon(pm: PackageManager, packageName: String?): String {
        return try {
            getEncodedIcon(pm.getApplicationIcon(packageName!!))
        } catch (nameNotFoundException: PackageManager.NameNotFoundException) {
            "NOT_FOUND"
        }
    }

    fun getEncodedIcon(drawable: Drawable): String {
        // Single color bitmap will be created of 1x1 pixel
        val bitmap = Bitmap.createBitmap(
            if (drawable.intrinsicWidth > 0) drawable.intrinsicWidth else 1,
            if (drawable.intrinsicHeight > 0) drawable.intrinsicHeight else 1,
            Bitmap.Config.ARGB_8888
        )

        val canvas = Canvas(bitmap)

        drawable.setBounds(0, 0, canvas.width, canvas.height)
        drawable.draw(canvas)

        val byteArrayOutputStream = ByteArrayOutputStream()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            bitmap.compress(Bitmap.CompressFormat.WEBP_LOSSY, 50, byteArrayOutputStream)
        } else {
            bitmap.compress(Bitmap.CompressFormat.WEBP, 50, byteArrayOutputStream)
        }

        return Base64.encodeToString(byteArrayOutputStream.toByteArray(), Base64.NO_WRAP)
    }

    @Throws(PackageManager.NameNotFoundException::class)
    fun getPackageInfo(reactContext: ReactApplicationContext): PackageInfo {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            reactContext.packageManager.getPackageInfo(
                reactContext.packageName,
                PackageManager.PackageInfoFlags.of(0)
            )
        } else {
            reactContext.packageManager.getPackageInfo(reactContext.packageName, 0)
        }
    }
}

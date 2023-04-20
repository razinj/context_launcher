package com.razinj.context_launcher;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.util.Base64;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.ByteArrayOutputStream;

public class Utils {

    private Utils() {
        super();
    }

    public static String getEncodedIcon(@NonNull PackageManager pm, String packageName) {
        try {
            return getEncodedIcon(pm.getApplicationIcon(packageName));
        } catch (PackageManager.NameNotFoundException nameNotFoundException) {
            return "NOT_FOUND";
        }
    }

    public static String getEncodedIcon(@NonNull Drawable drawable) {
        Bitmap bitmap;

        // Single color bitmap will be created of 1x1 pixel
        bitmap = Bitmap.createBitmap(
                drawable.getIntrinsicWidth() > 0 ? drawable.getIntrinsicWidth() : 1,
                drawable.getIntrinsicHeight() > 0 ? drawable.getIntrinsicHeight() : 1,
                Bitmap.Config.ARGB_8888
        );

        final Canvas canvas = new Canvas(bitmap);

        drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
        drawable.draw(canvas);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            bitmap.compress(Bitmap.CompressFormat.WEBP_LOSSY, 50, byteArrayOutputStream);
        } else {
            bitmap.compress(Bitmap.CompressFormat.WEBP, 50, byteArrayOutputStream);
        }

        return Base64.encodeToString(byteArrayOutputStream.toByteArray(), Base64.NO_WRAP);
    }

    public static PackageInfo getPackageInfo(ReactApplicationContext reactContext) throws PackageManager.NameNotFoundException {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            return reactContext.getPackageManager().getPackageInfo(reactContext.getPackageName(), PackageManager.PackageInfoFlags.of(0));
        } else {
            return reactContext.getPackageManager().getPackageInfo(reactContext.getPackageName(), 0);
        }
    }
}

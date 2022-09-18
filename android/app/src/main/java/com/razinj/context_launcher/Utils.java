package com.razinj.context_launcher;

import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.util.Base64;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.ByteArrayOutputStream;

public class Utils {

    public static String getEncodedIcon(ReactApplicationContext context, String packageName) {
        try {
            return getEncodedIcon(context.getPackageManager().getApplicationIcon(packageName));
        } catch (PackageManager.NameNotFoundException nameNotFoundException) {
            return "";
        }
    }

    public static String getEncodedIcon(Drawable drawableIcon) {
        Bitmap icon;

        if (drawableIcon.getIntrinsicWidth() <= 0 || drawableIcon.getIntrinsicHeight() <= 0) {
            // Single color bitmap will be created of 1x1 pixel
            icon = Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888);
        } else {
            icon = Bitmap.createBitmap(drawableIcon.getIntrinsicWidth(), drawableIcon.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
        }

        final Canvas canvas = new Canvas(icon);

        drawableIcon.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
        drawableIcon.draw(canvas);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        icon.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);

        return Base64.encodeToString(byteArrayOutputStream.toByteArray(), Base64.NO_WRAP);
    }
}

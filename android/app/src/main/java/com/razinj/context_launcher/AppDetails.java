package com.razinj.context_launcher;

import androidx.annotation.NonNull;

import org.json.JSONException;
import org.json.JSONObject;

public class AppDetails {
    String packageName;
    String name;
    String icon;

    AppDetails(String packageName, String name, String icon) {
        this.packageName = packageName;
        this.name = name;
        this.icon = icon;
    }

    @NonNull
    public String toString() {
        try {
            JSONObject appDetails = new JSONObject();

            appDetails.put("packageName", this.packageName);
            appDetails.put("name", this.name);
            appDetails.put("icon", this.icon);

            return appDetails.toString();
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}

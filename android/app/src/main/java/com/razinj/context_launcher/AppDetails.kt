package com.razinj.context_launcher

import android.util.Log
import org.json.JSONException
import org.json.JSONObject

class AppDetails internal constructor(
    private var packageName: String,
    private var name: String,
    private var icon: String?,
) {
    override fun toString(): String {
        try {
            val appDetails = JSONObject()

            appDetails.put("packageName", this.packageName)
            appDetails.put("name", this.name)
            appDetails.put("icon", this.icon)

            return appDetails.toString()
        } catch (e: JSONException) {
            Log.e("AppsModule", "Couldn't construct app details JSON: " + e.message)
            throw RuntimeException(e)
        }
    }
}

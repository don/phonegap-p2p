package com.chariotsolutions.toast.plugin;

import android.util.Log;
import android.widget.Toast;
import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.apache.cordova.api.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

public class ToastPlugin extends Plugin {

    private static final String TAG = "ToastPlugin";
    private static final String LONG_TOAST_ACTION = "show_long";
    private static final String CANCEL_ACTION = "cancel";
    private static final int TOAST_MESSAGE_INDEX = 0;

    private Toast toast = null;

    @Override
    public PluginResult execute(String action, JSONArray args, String callbackId) {
        Log.d(TAG, action);

        if (action.equals(CANCEL_ACTION)) {

            cancelToast();

        } else {

            String message;
            try {
                message = args.getString(TOAST_MESSAGE_INDEX);
            } catch (JSONException e) {
                Log.e(TAG, "Required parameter 'Toast Message' missing");
                return new PluginResult(Status.JSON_EXCEPTION);
            }

            if (action.equals(LONG_TOAST_ACTION)) {
                showToast(message, Toast.LENGTH_LONG);
            } else {
                showToast(message, Toast.LENGTH_SHORT);
            }
        }

        return new PluginResult(Status.OK);
    }

    private void cancelToast() {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (toast != null) toast.cancel();
            }
        });
    }

    private void showToast(final String message, final int length) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                toast = Toast.makeText(cordova.getActivity(), message, length);
                toast.show();
            }
        });
    }

}
package com.fundoo_notes;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class PushNotificationModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "SendLocalNotification";
    private static ReactApplicationContext reactContext;

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    public PushNotificationModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void startService(){
        this.reactContext.startService(new Intent(this.reactContext, PushNotificationService.class));
        Log.d("this is", "Our task is working properly" );
    }
}

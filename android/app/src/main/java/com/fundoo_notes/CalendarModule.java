package com.fundoo_notes;

import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CalendarModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public CalendarModule( ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void createCalendarEvent(String name, String location) {
        Log.d("CalendarModule", "Create event called with name: " + name
                + " and location: " + location);
       PushNotificationModule pushNotificationModule = new PushNotificationModule()
    }

    @ReactMethod
    public void startService(){
        this.reactContext.startService(new Intent(this.reactContext, PushNotificationService.class));
        Log.d("this is", "Our task is working properly" );
    }

    @NonNull
    @Override
    public String getName() {
        return "CalendarModule";
    }
}

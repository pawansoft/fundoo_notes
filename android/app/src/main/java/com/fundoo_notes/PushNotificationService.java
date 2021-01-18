package com.fundoo_notes;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;

import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;

public class PushNotificationService extends Service {
    private Handler handler = new Handler();
    private Runnable runnableCode = new Runnable() {
        @Override
        public void run() {
            Context context = getApplicationContext();
            Intent intent = new Intent(context, PushNotificationEventService.class);
            HeadlessJsTaskService.acquireWakeLockNow((context));
            handler.postDelayed(this, 2000);
        }
    };

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}

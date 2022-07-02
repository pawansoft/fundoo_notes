import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging'

class PushNotificationService{

    // async checkPermission() {
        
    //     const enabled = await messaging().hasPermission();
    //     console.log(enabled);
    //     if (enabled) {
    //         this.getToken();
    //     } else {
    //         this.requestPermission();
    //     }
    // }

    // async getToken(){
    //     let fcmToken = await AsyncStorage.getItem('fcmToken');
    //     if(!fcmToken){          
    //         fcmToken = await messaging().getToken();
    //         if (fcmToken) {
    //             // user has a device token
    //             await AsyncStorage.setItem('fcmToken', fcmToken);
    //         }
    //     }
    // }

    // async requestPermission() {
    //     try {
    //         await messaging().requestPermission();
    //         // User has authorised
    //         this.getToken();
    //     } catch (error) {
    //         // User has rejected permissions
    //         console.log('permission rejected');
    //     }
    //   }
}

export default new PushNotificationService()
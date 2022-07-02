import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLiteCRUDService from '../SQLite_service/SQLiteCRUDService';
import moment from "moment";
// import PushNotification from 'react-native-push-notification';

class Notification{
  
  // test = (title, notes) => {
  //   PushNotification.localNotification({
  //   title : title,
  //   message : notes
  //   });
  //   }

  //     sendLocalNotification = async() => {
  //       await SQLiteCRUDService.getDetailsFromSQLiteDatabase()
  //       .then(async (data) => {
  //         var temp = []
  //           if (data.rows.length != 0) {
  //               for (let i = 0; i < data.rows.length; ++i)
  //               {
  //                 if(moment(JSON.parse(data.rows.item(i).Reminder)).format('D MMM, h.mm a') == moment(new Date).format('D MMM, h.mm a')){
  //                   this.test(data.rows.item(i).Title, data.rows.item(i).Notes);
  //                 }
  //               }
  //           }
  //       })
  //       console.log('Local notification is updating');
  //     }
}

export default new Notification();
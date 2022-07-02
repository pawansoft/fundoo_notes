import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

class firebase_rest_service {

    // storeNoteServiceByRest = async (noteid, title, note, label, reminder, isArchive, isDeleted) => {
    //     const userid = JSON.parse(await AsyncStorage.getItem('userId'))
    //     const notes = {
    //         title: title,
    //         note: note,
    //         label: label,
    //         reminder: reminder,
    //         isArchive: isArchive,
    //         isDeleted: isDeleted
    //     }
    //     axios.put(`https://fundoo-notes-8dd0a-default-rtdb.firebaseio.com/Notes/${userid}/${noteid}.json`, { notes })
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //         }).catch(error => reject(error))
    // }

    // DeleteServiceController = async (noteKey) => {
    //     const userid = JSON.parse(await AsyncStorage.getItem('userId'))
    //     return new Promise((resolve, reject) => {
    //         fetch(`https://fundoo-notes-8dd0a-default-rtdb.firebaseio.com/Notes/${userid}/${noteKey}.json`, {
    //             method: 'DELETE'
    //         })
    //             .then(() => resolve('Success'))
    //             .catch(() => reject(error))
    //     })

    // }
}
export default new firebase_rest_service()

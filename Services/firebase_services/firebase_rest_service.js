import AsyncStorage from "@react-native-async-storage/async-storage";

class firebase_rest_service {

    storeNotesDetail = async (noteid, title, notes, label, reminder, isArchive, isDeleted) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            
            const note ={
                title : title,
                note : notes,
                label : label,
                reminder: reminder,
                isArchive: isArchive,
                isDeleted: isDeleted
            }

            fetch(`https://fundoo-notes-8dd0a-default-rtdb.firebaseio.com/Notes/${userid}/${noteid}.json`, {
                method: 'PUT',
                heders: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    NoteDetails : note
                }) 
            }).then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    DeleteServiceController= async(noteKey) =>{
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            fetch(`https://fundoo-notes-8dd0a-default-rtdb.firebaseio.com/Notes/${userid}/${noteKey}.json`, {
                method: 'DELETE'
            })
            .then(() => resolve('Success'))
            .catch(() => reject(error))
        })

    }
}
export default new firebase_rest_service()

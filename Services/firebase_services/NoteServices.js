import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase from '../../config/Firebase';

class FirebaseService{
    _storeNoteService = async (notekey, title, note, labels) =>{
        const userid = JSON.parse(await AsyncStorage.getItem('userId')) 
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                labels: labels,
                isDeleted: false,
                isArchive: false
            }
            Firebase.database().ref('Notes/' +userid+'/' +notekey).set({
                NotesDetail : notes
            }).then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    _getNoteService = async() => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'));
       return new Promise((resolve, reject)=> {
        Firebase.database()
        .ref('Notes/' +userid)
        .once('value', snapshot => {
            resolve(snapshot.val())
        }).catch(error => reject(error))
       })
    }

    _cleanRecycleBinService = async() => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'));
        return new Promise((resolve, reject) => {
            Firebase.database()
            .ref('Notes/' +userid)
        })
    }

    _updateNoteService = async(key, title, note, labels) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'));
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                labels: labels,
                isDeleted : false,
                isArchive: false
            }
            Firebase.database().ref('Notes/'+userid+ '/'+key).set({
                NotesDetail : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    _deleteNotesService = async(key, title, note, labels) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : true,
                isArchive: false,
                labels : labels,
            }
            Firebase.database().ref('Notes/'+userid+ '/'+ key).set({
                NotesDetail : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }
    _restoreNoteService = async(key, title, note, labels) => {
        const userid = JSON.parse(AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : false,
                isArchive: false,
                labels : labels,
            }
            Firebase.database().ref('Notes/'+userid+ '/'+ key).set({
                NotesDetail : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }    
    
    _deleteOneNoteService = async(key) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            let dataRef = Firebase.database().ref('Notes/'+userid+ '/'+key)
            dataRef.remove()
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

//Level function start from here

    addLabelInDatabase = async(labelId, labelName) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            Firebase.database().ref('Labels/'+userid+ '/' +labelId).set({
                labelName: labelName
            })
            .then(() => resolve('success'))
            .catch(error => reject (error))
        })
    }

    getLabelFromDatabase = async() => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            Firebase.database().ref('Labels/' + userid)
            .once('value', snapshot => {
                resolve(snapshot.val())
            })
            .catch(error => reject(error))
        })
    }

    updateLabelInFirebase = async(labelNoteKey, labelName) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            Firebase.database().ref('Labels/' + userid  + '/' + labelNoteKey).set({
                labelName : labelName
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    deleteLabelInFirebase = async(labelKey) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            Firebase.database().ref('Labels/' + userid  + '/' + labelKey).remove()
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

//Archive service funtions start from here 
    storeArchiveToDatabase = async(notekey, title, note, labels) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId')) 
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted: false,
                isArchive: true,
                labels : labels
            }
            Firebase.database().ref('Notes/' +userid+'/' +notekey).set({
                NotesDetail : notes
            }).then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

}

export default new FirebaseService();
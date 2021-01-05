import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase from '../../config/Firebase';

class FirebaseService{
    _storeNoteService = async (notekey, title, note) =>{
        const userid = JSON.parse(await AsyncStorage.getItem('userId')) 
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted: false
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

    _updateNoteService = async(key, title, note) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'));
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : false
            }
            Firebase.database().ref('Notes/'+userid+ '/'+key).set({
                NotesDetail : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    _deleteNotesService = async(key, title, note) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : true
            }
            Firebase.database().ref('Notes/'+userid+ '/'+ key).set({
                NotesDetail : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

//Level function start from here 
    _addLevelService = async (label) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            Firebase.database().ref('Labels/'+userid).push({
                label : label
            })
            .then(() => resolve('success'))
            .catch(error => reject (error))
        })
    }
    
    _getLevelService = async() => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'));
        return new Promise((resolve, reject)=> {
         Firebase.database()
         .ref('Labels/'+userid)
         .once('value', snapshot => {
             resolve(snapshot.val())
         }).catch(error => reject(error))
        })
    }

    _restoreNoteService = async(key, title, note) => {
        const userid = JSON.parse(AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : false
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
}

export default new FirebaseService();
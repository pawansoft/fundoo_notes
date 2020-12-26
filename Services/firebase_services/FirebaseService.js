import React from 'react';
import Firebase from '../../config/Firebase';

class FirebaseService{
    _storeNoteService = (userId, title, note) =>{
        return new Promise((resolve, reject) => {
            Firebase.database().ref('Notes/' +userId).push({
                Title : title,
                Note: note,
            }).then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    _getNoteService = async(userId) => {
       return new Promise((resolve, reject)=> {
        Firebase.database()
        .ref('Notes/' +userId)
        .once('value', snapshot => {
            resolve(snapshot.val())
        }).catch(error => reject(error))
       })
    }
}

export default new FirebaseService();
import React from 'react';
import Firebase from '../../config/Firebase';

class FirebaseService{
    _storeNoteService = (userId, title, note) =>{
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted: false
            }
            Firebase.database().ref('Notes/' +userId).push({
                NotesDetail : notes
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

    _cleanRecycleBinService = async(userId) => {
        return new Promise((resolve, reject) => {
            Firebase.database()
            .ref('Notes/' +userId)
        })
    }

    _updateNoteService = (userId, key, title, note) => {
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : false
            }
            Firebase.database().ref('Notes/'+userId+ '/'+key).set({
                NotesDetail : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    _deleteNotesService = (userId, key, title, note) => {
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : true
            }
            Firebase.database().ref('Notes/'+userId+ '/'+ key).set({
                NotesDetail : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    _restoreNoteService = (userId, key, title, note) => {
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : false
            }
            Firebase.database().ref('Notes/'+userId+ '/'+ key).set({
                NotesDetail : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }
    _deleteOneNoteService = (userId, key) => {
        return new Promise((resolve, reject) => {
            let dataRef = Firebase.database().ref('Notes/'+userId+ '/'+key)
            dataRef.remove()
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }
}

export default new FirebaseService();
import NoteServices from '../firebase_services/NoteServices';
import SQLiteCRUDService from '../SQLite_service/SQLiteCRUDService';
import SQLiteLabelServices from '../SQLite_service/SQLiteLabelServices';

class NotesServiceController {
    addNote = (title, note) => {
        return new Promise(async (resolve, reject) => {
            //calling method to random generate note key
            var noteKey = await this.generateRandomKey();

            SQLiteCRUDService.storeNoteToSQLiteService(noteKey, title, note, 'false', 'false').then(
                (data) => {
                    NoteServices._storeNoteService(noteKey, title, note).then(
                        () => console.log('Uploaded to firebase'))
                        .catch((error) => console.log(error))
                        resolve(data)
                })
                .catch(error => reject(error))
        })
    }

    addArchive = (title, note) => {
        return new Promise(async (resolve, reject) => {
            var noteKey = await this.generateRandomKey();
            SQLiteCRUDService.storeArchiveNoteToSQLiteService(noteKey, title, note, 'false', 'true')
                .then((data) => {
                    NoteServices.storeArchiveToDatabase(noteKey, title, note)
                    .then (() => resolve('success'))
                    .catch(error => reject(error))
                })
            .catch(error => reject(error))
        })
    }

    updateNote = (noteKey, title, note) => {
        return new Promise((resolve, reject) => {
            SQLiteCRUDService.updateNoteDetailInSQLiteService(noteKey, title, note, 'false')
                .then((data) => 
                    NoteServices._updateNoteService(noteKey, title, note)
                        .then(resolve(data))
                        .catch((error) => console.log(error)))
                .catch(error => reject(error))
        })
    }

    moveToRecycleBin = (noteKey, title, note) => {
        return new Promise((resolve, reject) => {
            SQLiteCRUDService.updateNoteDetailInSQLiteService(noteKey, title, note, 'true').then(
                (data) => resolve(data))
                .catch(error => reject(error))

            NoteServices._deleteNotesService(noteKey, title, note).then(
                console.log('updated to firebase'))
                .catch((error) => console.log(error))
        })
    }
//Label function start from here 
    storeLabel = (labelId, label) => {
        return new Promise((resolve) => {
            SQLiteLabelServices.storeLabelInSQliteStorage(labelId, label)
                .then(() => {
                    NoteServices.addLabelInDatabase(labelId, label)
                        .then(() => console.log('added'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    updateLabel = (labelId, label) => {
        return new Promise((resolve) => {
            SQLiteLabelServices.updateLabelInSQliteStorage(labelId, label)
                .then(() => {
                    NoteServices.updateLabelInFirebase(labelId, label)
                        .then(() => console.log('updated'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    removeLabel = (labelId) => {
        return new Promise((resolve) => {
            SQLiteLabelServices.removeLabelinSQliteStorage(labelId)
                .then(() => {
                    NoteServices.deleteLabelInFirebase(labelId)
                        .then(() => console.log('removed'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    deleteNoteFromBin = (noteKey) => {
        return new Promise((resolve, reject) => {
            SQLiteCRUDService.deleteNoteForever(noteKey)
            .then((data) => resolve(data))
            .catch(error => reject(error))

            NoteServices._deleteOneNoteService(noteKey)
            .then(() => console.log('deleted from firebase'))
            .catch((error) => console.log(error))
        })
    }

    generateRandomKey = () => {
        const sampelValue = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
        var today = new Date();
        var noteKey = today.getFullYear() 
                        + String((today.getMonth() + 1) < 10 ? (0 + String(today.getMonth() + 1)) : today.getMonth) 
                        + String(today.getDate() < 10 ? (0 + String(today.getDate())) : today.getDate()) 
                        + String(today.getHours() < 10 ? '0' + today.getHours() : today.getHours())
                        + String(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) 
                        + String(today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds())
        for(let i=0; i < 6; i++){
            noteKey += sampelValue.charAt(Math.floor(Math.random) * sampelValue.length)
        }
        return noteKey;
    }
}

export default new NotesServiceController();

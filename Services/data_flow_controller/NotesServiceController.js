import NoteServices from '../firebase_services/NoteServices';
import SQLiteCRUDService from '../SQLite_service/SQLiteCRUDService';

class NotesServiceController {
    addNote = (title, note) => {
        return new Promise(async (resolve, reject) => {
            //calling method to random generate note key
            var noteKey = await this.generateRandomKey();

            SQLiteCRUDService.storeNoteToSQLiteService(noteKey, title, note, 'false').then(
                (data) => {
                    NoteServices._storeNoteService(noteKey, title, note).then(
                        () => console.log('Uploaded to firebase'))
                        .catch((error) => console.log(error))
                        resolve(data)
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
        noteKey = today.getFullYear() 
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

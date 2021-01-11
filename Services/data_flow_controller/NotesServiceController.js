import NoteServices from '../firebase_services/NoteServices';
import SQLiteCRUDService from '../SQLite_service/SQLiteCRUDService';
import SQLiteLabelServices from '../SQLite_service/SQLiteLabelServices';

class NotesServiceController {
    addNote = (title, note, labels) => {
        return new Promise(async (resolve, reject) => {
            //calling method to random generate note key
            var noteKey = await this.generateRandomKey();

            SQLiteCRUDService.storeNoteToSQLiteService(noteKey, title, note, 'false', 'false', labels).then(
                (data) => {
                    NoteServices._storeNoteService(noteKey, title, note, labels).then(
                        () => console.log('Uploaded to firebase'))
                        .catch((error) => console.log(error))
                        resolve(data)
                })
                .catch(error => reject(error))
        })
    }

    addArchive = (title, note, labels) => {
        return new Promise(async (resolve, reject) => {
            var noteKey = await this.generateRandomKey();
            SQLiteCRUDService.storeArchiveNoteToSQLiteService(noteKey, title, note, 'false', 'true', labels)
                .then((data) => {
                    NoteServices.storeArchiveToDatabase(noteKey, title, note, labels)
                    .then (() => resolve('success'))
                    .catch(error => reject(error))
                })
            .catch(error => reject(error))
        })
    }

    removeArchive = (noteKey, title, note, labels) =>
    {
        return new Promise(async (resolve, reject) => {
            SQLiteCRUDService.RestoreArchive(noteKey)
                .then((data) => {
                    NoteServices._restoreNoteService(noteKey, title, note, labels)
                    .then (() => resolve('success'))
                    .catch(error => reject(error))
                })
            .catch(error => reject(error))
        })

    }

    updateNote = (noteKey, title, note, labels) => {
        return new Promise((resolve, reject) => {
            SQLiteCRUDService.updateNoteDetailInSQLiteService(noteKey, title, note, 'false', labels)
                .then((data) => 
                    NoteServices._updateNoteService(noteKey, title, note, labels)
                        .then(resolve(data))
                        .catch((error) => console.log(error)))
                .catch(error => reject(error))
        })
    }

    moveToRecycleBin = (noteKey, title, note, labels) => {
        return new Promise((resolve, reject) => {
            SQLiteCRUDService.updateNoteDetailInSQLiteService(noteKey, title, note, 'true', labels).then(
                (data) => resolve(data))
                .catch(error => reject(error))

            NoteServices._deleteNotesService(noteKey, title, note).then(
                console.log('updated to firebase'))
                .catch((error) => console.log(error))
        })
    }
//Label function start from here 
    storeLabel = (label) => {
        var labelId = this.generateRandomKey();
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
        return Date.now()
    }
}

export default new NotesServiceController();

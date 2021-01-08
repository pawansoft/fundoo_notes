import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = openDatabase({name: 'fundoo_notes.db', createFromLocation: 1});

class SQLiteCRUDService {   

    createTableService = async() => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            db.transaction((transect) => {
                transect.executeSql(`CREATE TABLE IF NOT EXISTS ${userid} ("NoteKey" TEXT, "Title" TEXT, "Notes" TEXT, "isDeleted" TEXT, "isArchive" TEXT ,"Labels" Text, PRIMARY KEY("NoteKey"))`, [], (tx, results) => {
                    resolve(results)
                },
                error => reject(error)
                )
            })
        })
    }

    storeNoteToSQLiteService = async (noteKey, title, notes, deletedStatus, isArchive, labels) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking to create table
            this.createTableService();
            //adding data logic
            db.transaction((transect) => {
                transect.executeSql(
                    `INSERT INTO ${userid} (NoteKey, Title, Notes, isDeleted, isArchive, Labels) VALUES (?,?,?,?,?)`,
                    [noteKey, title, notes, deletedStatus, isArchive, labels],
                    async (transect, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            })
        })
    }

    updateNoteDetailInSQLiteService = async (key, title, notes, deletedStatus, labels) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking that table is created or not
            this.createTableService();

            db.transaction(async (transect) => {
                transect.executeSql(
                    `UPDATE ${userid} set Title = ? , Notes = ?,isDeleted = ?, Labels = ?  where NoteKey = ?`,
                    [title, notes, deletedStatus, key, labels],
                    async (transect, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                )
            })
        })
    }

    getDetailsFromSQLiteDatabase = async() => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking table is created or not
            this.createTableService();
            
            db.transaction((transect) => {
                transect.executeSql(`SELECT * FROM ${userid}`, [], (transect, results) => {
                    resolve(results)
                }, error => reject(error))
            })
        })
    }

    deleteNoteForever = async (noteKey) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            db.transaction((transect) => {
                transect.executeSql(
                    `DELETE FROM ${userid} WHERE NoteKey = ?`, [noteKey], (transect, results) =>
                        resolve('success'),
                        error => reject(error)
                )
            })
        })
    }

//Archive function start from here 
    storeArchiveNoteToSQLiteService = async (noteKey, title, notes, deletedStatus, isArchive) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking to create table
            await this.createTableService();
            //adding data logic
            db.transaction((transect) => {
                transect.executeSql(
                    `INSERT INTO ${userid} (NoteKey, Title, Notes, isDeleted, isArchive) VALUES (?,?,?,?,?)`,
                    [noteKey, title, notes, deletedStatus, isArchive],
                    async (transect, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            })
        })
    }

    addNotesFromFirebaseToSQLite = async (noteKey, title, notes, deletedStatus) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking that table is created or not
            this.createTableService();

            db.transaction((transect) => {
                transect.executeSql(
                    `INSERT INTO  ${userid}(NoteKey, Title, Notes, isDeleted) VALUES (?,?,?,?)`,
                    [noteKey, title, notes, deletedStatus],
                    async (transect, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            })
        })
    }
    
    
}

export default new SQLiteCRUDService();
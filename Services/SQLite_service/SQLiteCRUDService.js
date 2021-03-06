import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = openDatabase({ name: 'fundoo_notes.db', createFromLocation: 1 });

class SQLiteCRUDService {

    createTableService = async () => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            db.transaction((transect) => {
                transect.executeSql(`CREATE TABLE IF NOT EXISTS ${userid} ("NoteKey" TEXT, "Title" TEXT, "Notes" TEXT, "isDeleted" TEXT, "isArchive" TEXT ,"Labels" Text, "Reminder" Text, PRIMARY KEY("NoteKey"))`, [], (tx, results) => {
                    resolve(results)
                },
                    error => reject(error)
                )
            })
        })
    }



    storeNoteToSQLiteService = async (noteKey, title, notes, deletedStatus, isArchive, labels, reminder) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking to create table
            this.createTableService();
            //adding data logic
            db.transaction((transect) => {
                transect.executeSql(
                    `INSERT INTO ${userid} (NoteKey, Title, Notes, isDeleted, isArchive, Labels, Reminder) VALUES (?,?,?,?,?,?,?)`,
                    [noteKey, title, notes, deletedStatus, isArchive, labels, reminder],
                    async (transect, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            })
        })
    }

    updateNoteDetailInSQLiteService = async (key, title, notes, deletedStatus, labels, reminder) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking that table is created or not
            this.createTableService();

            db.transaction(async (transect) => {
                transect.executeSql(
                    `UPDATE ${userid} set Title = ? , Notes = ?,isDeleted = ?, Labels = ?, Reminder = ?  where NoteKey = ?`,
                    [title, notes, deletedStatus, labels, reminder, key],
                    async (transect, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                )
            })
        })
    }

    getDetailsFromSQLiteDatabase = async () => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking table is created or not
            if (userid != null && userid != undefined) {
                this.createTableService();
                db.transaction((transect) => {
                    transect.executeSql(`SELECT * FROM ${userid}`, [], (transect, results) => {
                        resolve(results)
                    }, error => reject(error))
                })

            }
        })
    }

    getConditionalDetailsFromSQLiteDatabase = async (isArchive, isDeleted) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking table is created or not
            this.createTableService();

            db.transaction((transect) => {
                transect.executeSql(`SELECT * FROM ${userid} WHERE isArchive = ? AND isDeleted = ?`, [isArchive, isDeleted], (transect, results) => {
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
    storeArchiveNoteToSQLiteService = async (noteKey, title, notes, deletedStatus, isArchive, label, reminder) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking to create table
            await this.createTableService();
            //adding data logic
            db.transaction((transect) => {
                transect.executeSql(
                    `INSERT INTO ${userid} (NoteKey, Title, Notes, isDeleted, isArchive, Labels, Reminder) VALUES (?,?,?,?,?,?,?)`,
                    [noteKey, title, notes, deletedStatus, isArchive, label, reminder],
                    async (transect, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            })
        })
    }

    RestoreArchive = async (noteKey, isArchive) => {
        const userid = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise(async (resolve, reject) => {
            //checking to create table
            await this.createTableService();

            db.transaction((transect) => {
                transect.executeSql(
                    `UPDATE ${userid} set isArchive = ? where noteKey = ?`,
                    [isArchive, noteKey],
                    async (transect, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                )
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
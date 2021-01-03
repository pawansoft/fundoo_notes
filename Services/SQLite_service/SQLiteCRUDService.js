import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'fundoo_notes.db' });

class SQLiteCRUDService {

    storeUserDetailToSQLLiteService = (userId, first_name, last_name) => {
        return new Promise((resolve, reject) => {
            db.transaction(transect => {
                transect.executeSql(
                    'INSERT INTO userDetail (email, first_name, last_name) VALUES (?,?,?)',
                    [userId, first_name, last_name],
                    (results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            });
        })
    }

    storeNoteToDB = (userId, title, note, isDeleted) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO notes_table (userId, title, notes, isDeleted) VALUES (?,?,?, ?)',
                    [userId, title, note, isDeleted],
                    async (tx, results) => {
                        console.log(results);
                        resolve(results)
                    },
                    error => reject(error)
                )
            })
        })
    }
}

export default new SQLiteCRUDService();
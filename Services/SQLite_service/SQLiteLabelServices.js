import AsyncStorage from '@react-native-async-storage/async-storage';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'fundoo_notes.db', createFromLocation: 1});

class SQLiteLabelServices{

    createTableInSQliteStorage = async() => {
        const userId = JSON.parse(await AsyncStorage.getItem('userId'))
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS '${userId}_label' (label_id TEXT PRIMARY KEY, label TEXT)`,
                [],
                (tx, results) => console.log('success'),
                error => console.log(error)
            )
        })
    }

    storeLabelInSQliteStorage = async( labelId, label) => {
        const userId = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            //checking to create the table
            this.createTableInSQliteStorage()
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO '${userId}_label' (label_id, label) VALUES (?,?)`,
                    [labelId, label],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    selectLabelFromSQliteStorage = async() => {
        const userId = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            //checking to create the table
            this.createTableInSQliteStorage()

            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM '${userId}_label'`,
                    [],
                    (tx, results) => resolve(results),
                    error => reject(error)
                );
            });
        })
    }

    updateLabelInSQliteStorage = async(labelId, label) => {
        const userId = JSON.parse(await AsyncStorage.getItem('userId'))
        //checking to create the table
        this.createTableInSQliteStorage()

        //function starts here
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE '${userId}_label' set label = ? where label_id = ?`,
                    [label, labelId],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    removeLabelinSQliteStorage = async(labelId) => {
        const userId = JSON.parse(await AsyncStorage.getItem('userId'))
        return new Promise((resolve, reject) => {
            //checking to create the table
            this.createTableInSQliteStorage()

            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM '${userId}_label' where label_id = ?`,
                    [labelId],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    deleteTableinSQLiteStorage = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem('userId'))
        //checking to create the table
        this.createTableInSQliteStorage()

        db.transaction(tx => {
            tx.executeSql(
                `DROP TABLE '${userId}_label'`,
                [],
                (tx, results) => console.log('table deleted'),
                error => console.log(error)
            );
        });
    }

}

export default new SQLiteLabelServices();
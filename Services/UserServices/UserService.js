import Firebase from '../../config/Firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserService{
    SignupService(email, password){
        return new Promise((resolve, reject) => {
            Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userDetail => resolve(userDetail))
            .catch(error => reject('error'))
        })
    }

    LoginService(email, password){
        return new Promise((resolve, reject) => {
            Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(userDetail => resolve(userDetail))
            .catch(error => reject(error))
        })
    }

    ResetPasscodeService(emailId){
        return new Promise((resolve, reject) => {
            Firebase.auth()
            .sendPasswordResetEmail(emailId)
            .then(() => resolve('Success'))
            .catch(error => reject('error'))
        })
    }

    logoutService = async() => {
        return new Promise((resolve, reject)=>{
            Firebase.auth()
            .signOut()
            .then(() => resolve('LoggedOut'))
            .catch(error => reject('error'));
        })
    }

    storeDetailToDatabase = (userId, emailId, firstName, lastName) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('users/' +userId).set({
                userName : emailId,
                first_name: firstName,
                last_name : lastName
            }).then(() => resolve('Success'))
            .catch(error => reject(error))
        }, 300000)
    }

    _getUserDetailService = async(userId) => {
        return new Promise((resolve, reject)=> {
         Firebase.database()
         .ref("users/")
         .once('value', snapshot => {
             resolve(snapshot.val())
         }).catch(error => reject(error))
        })
     }

     _updateImageUrlService = (userid, image)=> {
        Firebase.database().ref('users/' + userid).update ({
            photo : image
        })
     }
}

export default new UserService();
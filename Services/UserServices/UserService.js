import Firebase from '../../config/Firebase'
import { LoginManager, AccessToken } from 'react-native-fbsdk';

class UserService{
    SignupService(email, password){
        return new Promise((resolve, reject) => {
            Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => resolve('Success'))
            .catch(error => reject('error'))
        })
    }

    LoginService(email, password){
        return new Promise((resolve, reject) => {
            Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => resolve('Success'))
            .catch(error => reject('error'))
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

}

export default new UserService();
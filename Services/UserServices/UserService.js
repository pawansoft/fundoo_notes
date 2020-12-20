import Firebase from '../../config/Firebase'

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
            .catch(error => reject('error'))
        })
    }

    ResetPasscodeService(emailId){
        return new Promise((resolve, reject) => {
            Firebase.auth()
            .sendPasswordResetEmail(emailId)
            .then(userDetail => resolve(userDetail))
            .catch(error => reject('error'))
        })
    }

}

export default new UserService();
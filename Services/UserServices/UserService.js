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
            .then(() => resolve('Success'))
            .catch(error => reject('error'))
        })
    }

    storeDetailToDatabase = (userId, emailId, firstName, lastName) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('users/' +userId).push({
                userName : emailId,
                first_name: firstName,
                last_name : lastName
            }).then(() => resolve('Success'))
            .catch(error => reject(error))
        }, 300000)
    }
}

export default new UserService();
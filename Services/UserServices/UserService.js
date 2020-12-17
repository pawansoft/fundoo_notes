import Firebase from '../../config/Firebase'

export function SignupService(email, password){
    return new Promise((resolve, reject) => {
        Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => resolve('Success'))
        .catch(error => reject('error'))
    })
}

export function LoginService(email, password){
    return new Promise((resolve, reject) => {
        Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => resolve('Success'))
        .catch(error => reject('error'))
    })
}

export function ResetPasscodeService(emailId){
    return new Promise((resolve, reject) => {
        Firebase.auth()
        .sendPasswordResetEmail(emailId)
        .then(() => resolve('Success'))
        .catch(error => reject('error'))
    })
}
import Firebase from '../../config/Firebase'
import FetchBlob from 'react-native-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Blob = FetchBlob.polyfill.Blob
const fs = FetchBlob.fs
window.XMLHttpRequest = FetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const Fetch = FetchBlob.polyfill.Fetch

window.fetch = new Fetch({
    auto : true,
    binaryContentTypes : ['image/']
}).build()

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

     _updateImageUrlService = (userid, firstName, lastName, emailId, image)=> {
        Firebase.database().ref('users/' + userid).set ({
            userName : emailId,
            first_name: firstName,
            last_name : lastName,
            photo : image
        })
     }

     uploadProfileImage = (uri, mime = 'application/octet-stream') => {
        return new Promise(async (resolve, reject) => {
            const userid = await AsyncStorage.getItem('userId');
            let uploadBlob = null
            const imageRef = Firebase.storage().ref(userid)
            fs.readFile(uri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
              })
              .catch((error) => {
                reject(error)
            })
        })
    }
    
    getProfileImageService =() => {
        return new Promise(async (resolve, reject) => {
            const userid = await AsyncStorage.getItem('userId');
            Firebase.storage().ref('/' +userid).getDownloadURL()
            .then(url => resolve(url))
            .catch(error => reject(error))
        })
    }
}

export default new UserService();
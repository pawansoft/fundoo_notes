import firebase from 'firebase'
import {LoginManager, AccessToken} from 'react-native-fbsdk'
import Firebase from '../../config/Firebase';

class SocialServices {
    facebookLogin = () => {
        return new Promise(async (resolve, reject) => {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                reject('Login was cancelled')
            }          
            const data = await AccessToken.getCurrentAccessToken();         
            if (!data) {
                reject('Something went wrong obtaining access token');
            }
            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            firebase.auth().signInWithCredential(facebookCredential)
                .then(UserCredential => resolve(UserCredential))
                .catch(error => {
                    console.log(error);
                })
        })
    }

    _storeFBDetailIntoFirebase = (userDetail) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('facebook-users/').push({
                first_name : userDetail.additionalUserInfo.profile.first_name,
                last_name : userDetail.additionalUserInfo.profile.last_name,
                email : userDetail.user.email,
            }).then(() => resolve('Success'))
            .catch(error => reject(error))
        })
        
        
    }
}

export default new SocialServices();
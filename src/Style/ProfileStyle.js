import {StyleSheet} from 'react-native'
const ProfileStyle = StyleSheet.create({
    container: {
        height : '40%',
        width : '80%',
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor:'white'
    },
    image :{
        marginTop : '3%',
        flexDirection: "row", 
        justifyContent: "space-between",
        alignSelf: "center"  
    },
    profileDetail: {
        alignSelf :'center',
        marginTop: '5%'
    },
    first_name:{
        alignSelf : 'center',
        marginTop: '2%'

    },
    last_name:{
        alignSelf : 'center',
        marginTop: '2%'
    },
    email:{
        marginTop: '2%'
    }
})

export default ProfileStyle;
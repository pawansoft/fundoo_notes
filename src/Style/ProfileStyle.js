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
        marginTop : '12%',
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
    },
    mode_select_button :{
        backgroundColor : 'rgb(80, 80, 73)',
        width : '80%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '5%',
        borderRadius: 9,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
        
    },
    button_text:{
       color : 'white' 
    }
})

export default ProfileStyle;
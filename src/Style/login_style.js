import {StyleSheet} from 'react-native'
const login_style = StyleSheet.create({
    container: {
        borderWidth : 2,
        alignContent : 'center',
        borderColor : 'black',
        width : '90%',
        marginLeft: '5%',
        height : '75%',
        borderRadius : 5,
        
    },
    
    header_image : {
        height : '2%',
        alignSelf : 'center',
        marginBottom : '20%'
    },
    login_header_text: {
        fontSize : 20,
        marginTop : '10%'
    },
    text_container: {
        borderWidth : 1,
        borderColor : 'black',
        margin: '5%',
        width : '90%',
        height : '15%',
        borderRadius : 5

    },
    error_text: {
        color : 'red',
        marginLeft : '70%'
    },
    forget_password: {
        marginLeft : '5%',
    },
    signup_button_container :{
        margin: '10%',
        marginTop : '7%',
    },
    button_text : {
        fontSize : 20,
        fontWeight: 'bold',
        color : 'blue'
    },
    login_button_container: {
        marginTop : '7%',
        marginLeft :' 35%'
    },
    scroll_view :{
        marginBottom : 200
    }
})
export default login_style
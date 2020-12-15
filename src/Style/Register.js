import {StyleSheet} from 'react-native'
const RegisterStyle = StyleSheet.create({
    text_input: {
        marginLeft :'5%',
      
        borderWidth: 1,
        width: '90%',
        color: 'black',
        height: 40,
        borderRadius : 4   
    },
    row_text_input :{
        margin: '5%',
        fontSize: 20,
        borderWidth: 1,
        width: '40%',
        color: 'black',
        height: 40,
        borderRadius: 5
    },
    Opacity_Text:{
        fontSize : 50
    },
    
    touchable_opacity_style:{
        marginTop : '10%',
        marginLeft : '5%'
        
    },
    button:{
        marginTop : '10%',
        marginLeft: '42%',
        height : 40,
        width: 90,
        borderRadius: 3,
        
    },
    button_text : {
        fontSize : 20,
        fontWeight: 'bold',
        color : 'blue'
    },
    signin_text: {
        fontSize : 25,
        marginLeft : '38%',
        marginBottom: '5%',
        fontWeight: 'bold'
    },
    error_first_name: {
        marginLeft : '70%',
        color : 'red'
    },
    error_last_name: {
        marginLeft : '70%',
        color : 'red'
    },
    passcode_error: {
        marginLeft : '20%',
        color: 'red'
    }
});
export default RegisterStyle;
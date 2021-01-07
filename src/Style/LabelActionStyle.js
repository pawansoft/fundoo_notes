import { StyleSheet } from 'react-native';

const LabelActionStyle = StyleSheet.create({
    textinput_style : { 
        backgroundColor : 'transparent', 
        paddingLeft : 20, 
        fontSize : 17,
        width : '65%',
    },

    textinput_error_style : {
        backgroundColor : 'transparent', 
        paddingLeft : 20, 
        fontSize : 17,
        paddingBottom : 0,
        width : '65%',
    },

    text_style : {
        color : 'black',
        fontSize : 17,
        paddingLeft : 20
    },

    text_error_style : {
        fontSize : 12, 
        color : 'red', 
        paddingLeft : 20
    },
    active_Appbar_Style: {
        backgroundColor : 'transparent', 
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        elevation: 0
    },
    appbar_Style: {
        backgroundColor: 'transparent',
        elevation: 0
    }
})

export default LabelActionStyle;
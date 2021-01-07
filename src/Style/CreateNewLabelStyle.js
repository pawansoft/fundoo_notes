import {StyleSheet} from 'react-native';

const CreateNewLabelStyles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor : 'white'
    },
    appbar_Style: {
        backgroundColor: 'transparent',
        elevation: 0,
    },
    appbar_selected_level: {
        marginTop: '2%',
        backgroundColor: 'transparent',
        elevation: 0,
    },
    appbar_selected_level_text:{
        marginLeft: '10%',
        width: '60%'
    },
    header_style:{
        backgroundColor : 'white'
    },
    appbar_Style_Active: {
        backgroundColor: 'transparent',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        elevation: 0,
    },
    edit_LabelStyle: {
        fontSize: 17, 
        paddingLeft: 15
    },
    textInput_Style: {
        width: '70%', 
        fontSize: 15,
    },
    textinput_style : { 
        backgroundColor : 'transparent', 
        paddingLeft : 20, 
        fontSize : 17,
    },

    textinput_error_style : {
        backgroundColor : 'transparent', 
        paddingLeft : 20, 
        fontSize : 17,
        paddingBottom : 0,
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
    create_label_appbar : {
        borderTopWidth : 0.7,
        borderBottomWidth : 0.7, 
        borderColor : 'grey',
    },
})
export default CreateNewLabelStyles;
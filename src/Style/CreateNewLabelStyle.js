import {StyleSheet} from 'react-native';

const CreateNewLabelStyles = StyleSheet.create({
    container: {
        height: '100%'
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
    }
})
export default CreateNewLabelStyles;
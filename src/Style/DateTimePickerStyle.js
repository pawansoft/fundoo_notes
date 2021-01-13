import { StyleSheet } from 'react-native';

const DateTimePickerStyle = StyleSheet.create({
    text_style : {
        fontSize : 17, 
        fontWeight : 'bold',
        marginLeft : 5,
        marginBottom : 10,
        alignSelf: 'center'
    },

    button_container_style : {
        flexDirection : 'row', 
        justifyContent : 'flex-end',
        marginTop : 80
    },
    date_selector_style:{
        marginBottom : 100
    },
    picker_container_style : {
        borderBottomWidth : 0.5, 
        borderColor : 'grey', 
        marginBottom : 10,
    },

    date_text_style : {
        fontSize : 18, 
        marginBottom : 15, 
        borderBottomWidth : 0.7, 
        paddingBottom : 5,
        paddingLeft : 5,
        borderColor : 'grey'
    },

    time_text_style : {
        fontSize : 18,  
        borderBottomWidth : 0.7, 
        paddingBottom : 5,
        paddingLeft : 5,
        borderColor : 'grey'
    },

    save_button_style : {
        backgroundColor : '#e6b800', 
        width : 90, 
        marginLeft : 15
    }
})

export default DateTimePickerStyle;
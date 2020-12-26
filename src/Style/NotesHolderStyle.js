import React from 'react';
import {
    StyleSheet
} from  'react-native'

const NotesHolderStyle = StyleSheet.create({
    headerContainer:{
        backgroundColor : 'white',
        borderWidth : 1,
        justifyContent : "space-around",
        borderColor: '#ddd'   
    },
    footerContainer:{
        backgroundColor : 'white',
        borderWidth : 1,
        justifyContent : "space-around",
        borderColor: '#ddd'   
    },
    Title :{
        margin : '10%'
    },
    TitleFont :{
        fontSize: 24,
        fontWeight : 'bold'
    },
    Note: {
        marginLeft : '10%'
    }
})

export default NotesHolderStyle;
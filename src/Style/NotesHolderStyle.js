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
        marginTop: '10%',
        marginLeft : '10%',
        marginBottom: '2%'
    },
    TitleFont :{
        fontSize: 24,
        fontWeight : 'bold'
    },
    Note: {
        marginLeft : '10%',
        marginRight: '10%'
    },
    label_text_container : {
        marginLeft : 25, 
        flexWrap : 'wrap', 
        marginTop : 10,
        flexDirection : 'row'
    },
    label_text: {
        borderWidth : 1, 
        paddingTop: 5, 
        paddingBottom : 5, 
        paddingLeft : 15, 
        paddingRight : 15, 
        borderColor : 'grey', 
        borderRadius : 40,
        marginRight : 10
    },
    label_text_grid: {
         
        flexWrap : 'wrap', 
        marginTop : 10,
        flexDirection : 'row'
    },
})

export default NotesHolderStyle;
import{
    StyleSheet
} from 'react-native';

const NotesContainerStyle = StyleSheet.create({
    container :{
        marginTop: '3%',
        marginLeft: '3%',
        borderWidth: 1,
        borderColor: '#bbb',
        width : '45%',
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        
        elevation: 8, 
    },
    container_title: {
        marginBottom : 5,
        borderEndColor: 'black'
    },
    container_list:{
        width : '96%',
        marginTop: '2%',
        marginLeft: '2%',
        borderWidth: 0.5,
        borderColor: 'grey',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        
        elevation: 8,
    },
    snakbarButton: {
        width: 500
    },
    label_container: {
        borderWidth: 1,
        margin: 2,
        borderRadius : 10,
        width : '80%'
    },
    label_container_list: {
        borderWidth: 1,
        margin: 2,
        borderRadius : 10,
        width : '50%'
    },
    label_text:{
        alignSelf : 'center',
    },
    menu:{
        backgroundColor : 'grey',
        alignSelf: 'center',
        marginTop : 5,
        width: '100%',
        borderRadius : 5
    }
})

export default NotesContainerStyle;
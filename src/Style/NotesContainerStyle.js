import{
    StyleSheet
} from 'react-native';

const NotesContainerStyle = StyleSheet.create({
    container :{
        marginTop: '3%',
        marginLeft: '3%',
        borderWidth: 1,
        borderColor: '#bbb',
        width : '45%'
    },
    container_title: {
        marginBottom : 5,
        borderEndColor: 'black'
    },
    container_list:{
        width : '96%',
        marginTop: '2%',
        marginLeft: '2%',
        borderWidth: 1,
        borderColor: '#bbb',
    }
})

export default NotesContainerStyle;
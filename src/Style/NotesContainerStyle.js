import{
    StyleSheet
} from 'react-native';

const NotesContainerStyle = StyleSheet.create({
    container :{
        marginTop: '5%',
        marginLeft: '5%',
        borderWidth: 1,
        borderColor: '#bbb',
        width : '42%'
    },
    container_title: {
        marginBottom : 5,
        borderEndColor: 'black'
    },
    container_list:{
        width : '90%',
        marginTop: '2%',
        marginLeft: '5%',
        borderWidth: 1,
        borderColor: '#bbb',
    }
})

export default NotesContainerStyle;
import {
    StyleSheet
} from 'react-native'

const PopulatedLabelStyle = StyleSheet.create({
    container :{
        flexDirection: 'row', 
        flexWrap: 'wrap', 
            marginTop: '5%'
    },
    appbar:{
        backgroundColor: 'rgba(55, 55, 55, 0.2)',
        width: '100%',
       
    },
    text:{
        width: '65%',
        marginLeft: '4%'
        
    },
    label_icon:{
        marginLeft : '4%'
    }
})

export default PopulatedLabelStyle
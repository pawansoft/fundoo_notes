import { StyleSheet } from "react-native";
const dashboardStyle = StyleSheet.create({
    avatar :{
        right : 0,
            borderWidth : 1,
        borderColor :'#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    searchBar :{
        marginLeft: '55%'
    },
    headerContainer:{
        backgroundColor : 'white',
        borderWidth : 1,
        justifyContent : "space-around",
        borderColor: '#ddd'
        
    },
    plusButton:{
        marginLeft : '30%',
        marginRight : '5%',
        marginBottom : 90,
        backgroundColor: 'white',
        height : 60,
        width: 60,
        borderRadius: 50,
        borderWidth : 1,
        borderColor :'#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }
})

export default dashboardStyle;
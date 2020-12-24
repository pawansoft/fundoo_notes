import React, { Component } from 'react';
import{
    View,
    Image
} from 'react-native'

export default class ResponsiveImage extends Component{
    
    render(){
        return(
            <View style = {{height : '100%', width : '100%'}}>
                <Image height= '100%' width = '100%'  source={require('../assets/img.png')}/>
            </View>
        )
    }
}
import React,{ Component } from 'react';
import {
    View,
    Text, 
    TouchableOpacity
} from 'react-native'
import { strings } from '../Localization/Localization';
import RegisterStyle from '../Style/Register';

export default class Dashboard extends Component{
    constructor(props){
        super(props)
    }

    SigninInsteadNavigationHandler = () => {
        this.props.navigation.navigate('Login')
    }

    goToResponsiveWebsiteNavigationHandle = () => {
        this.props.navigation.navigate('ResponsiveImg')
    }
    render(){
        return(
            <View>
                <Text>
                    Welcome to dashboard
                </Text>
                <TouchableOpacity style = {RegisterStyle.touchable_opacity_style}
                    onPress = {this.SigninInsteadNavigationHandler}>
                        <Text style ={RegisterStyle.button_text}> 
                            {strings.signin}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {RegisterStyle.touchable_opacity_style}
                    onPress = {this.goToResponsiveWebsiteNavigationHandle}>
                        <Text style ={RegisterStyle.button_text}> 
                            {strings.responsive}
                        </Text>
                    </TouchableOpacity>
               
            </View>
        )
    }
}
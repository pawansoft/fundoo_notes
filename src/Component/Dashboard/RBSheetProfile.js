import React from 'react';
import{View} from 'react-native';
import { Button } from 'react-native-paper';


export default class RBsheetProfile extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View >
                <View>
                    <Button
                    onPress = {this.props.takePhoto}>
                        Take Photo
                    </Button>
                </View>
                
                <View>
                    <Button onPress = {this.props.chooseFromLiberary}>
                        Choose From Library
                    </Button>
                </View>
                
                <View>
                    <Button
                    onPress = {this.props.cancle}>
                        Cancle
                    </Button>
                </View>
            </View>
        )
    }
}
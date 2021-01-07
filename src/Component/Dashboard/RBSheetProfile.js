import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import ProfileStyle from '../../Style/ProfileStyle';

export default class RBsheetProfile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View >
                <View style = {ProfileStyle.mode_select_button}>
                    <Button onPress={this.props.takePhoto}>
                        <Text style = {ProfileStyle.button_text}>
                            Take Photo
                        </Text>
                    </Button>
                </View>

                <View style = {ProfileStyle.mode_select_button}>
                    <Button onPress={this.props.chooseFromLiberary}>
                        <Text style = {ProfileStyle.button_text}>
                            Choose From Library
                        </Text>                
                    </Button>
                </View>

                <View style = {ProfileStyle.mode_select_button}>
                    <Button
                        onPress={this.props.cancle}>
                        <Text style = {ProfileStyle.button_text}>
                            Cancel
                        </Text>
                        
                    </Button>
                </View>
            </View>
        )
    }
}
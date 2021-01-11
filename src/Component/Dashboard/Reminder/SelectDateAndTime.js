import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import moment from 'moment'
import InputMoment from 'input-moment'



export default class SelectDateAndTime extends Component{
    constructor (props){
        super(props)
        this.state = {
            moment : ''
        }
    }
    render(){
        return(
            <View>
                <Text>
                    Time Selector
                </Text>
                <InputMoment
                    moment={this.state.moment}
                    onChange={this.handleChange}
                    onSave={this.handleSave}
                />
               
            </View>
        )
    }
}
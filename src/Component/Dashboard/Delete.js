import React, { Component } from 'react';
import{
    View,
    Text,
    ScrollView
}from 'react-native';
import DashboardHeader from './DashboardHeader';

export default class Delete extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <View>
                    <DashboardHeader navigation = {this.props.navigation}/>
                </View>
                <ScrollView>
                    <View>
                        
                    </View>
                </ScrollView>
               
            </View>
        )
    }
}
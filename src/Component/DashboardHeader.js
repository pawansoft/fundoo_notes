import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native';
import { Avatar,  Searchbar } from 'react-native-paper';

export default class DashboardHeader extends Component{
    constructor(props){
        super(props)
        this.state = {
            SearchQuery: ''
        }
    }

    SearchbarHandler = async(SearchQuery) => {
        this.setState({
            SearchQuery: SearchQuery
        })
    }

    render(){
        return(
            <View style = {{flexDirection: 'row', justifyContent: 'flex-end', marginRight: '10%'}}>
                <Text>
                    This is header
                </Text>
                <View>
                <Searchbar placeholder="Search"
                    onChangeText = {this.SearchbarHandler}
                    value = {this.state.SearchQuery} />
                </View>
                <View>
                    <Avatar.Image size = {44} source = {require('../assets/img.png')}/>
                    
                </View>
            </View>
        )
    }
}
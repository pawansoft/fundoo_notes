import React, { Component } from 'react';
import { Appbar, Avatar, Searchbar} from 'react-native-paper';
import dashboardStyle from '../../Style/dashboardStyle';

export default class DashboardHeader extends Component{
    constructor(props) {
        super(props)
        this.state = {
            listView : true
        }
    }

    selectView = async () => {
        await this.setState({
            listView : !this.state.listView
        })
    }

    render(){
        return(
            <Appbar style = {dashboardStyle.headerContainer}>
                <Appbar.Action
                icon = 'menu'
                onPress = {() => this.props.navigation.openDrawer()}/>
                
                <Searchbar
                placeholder = 'Search Notes' 
                style = {{width : '60%'}}
                onPress = {this.selectView}/>
                
                <Appbar.Action
                    style = {{marginRight : 10}}
                    icon = {this.state.listView ? 'view-grid-outline' : 'view-agenda-outline'}
                    onPress={() => console.log('Nothing is added so far')}        
                />
                <Avatar.Image style = {{flexDirection: "row", justifyContent: "space-between", alignItems: "center"  }} size = {40} source = {require('../../assets/img.png')}/>
            </Appbar>
        )
    }
}
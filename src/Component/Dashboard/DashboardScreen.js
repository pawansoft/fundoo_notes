import React, { Component } from 'react';
import{
    View,
    ScrollView
} from 'react-native';
import BottomBar from './dashboardFooter';
import DashboardHeader from './DashboardHeader';
import NotesContainer from './NotesContainer';

class DashboardScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            listView : true,
        }
    }

    selectView = async () => {
        const {onPress} = this.props
        await this.setState({
            listView : !this.state.listView
        })
        //onPress()
    }

    render(){
        return(
            <View style = {{flex: 1,  justifyContent: "space-between",}}>      
               <View>
                   <DashboardHeader navigation = {this.props.navigation} onPress = {this.selectView} listView = {this.state.listView}/>
               </View>  
                <ScrollView>
                    <View>
                        <NotesContainer navigation = {this.props.navigation} listview = {this.state.listView}/>
                    </View> 
                </ScrollView> 
                <View>
                    <BottomBar navigation = {this.props.navigation}/>
                </View>
            </View>
        )
    }
}
export default DashboardScreen;
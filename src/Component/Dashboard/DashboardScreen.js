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

        }
    }
    render(){
        
        return(
            
            <View style = {{flex: 1,  justifyContent: "space-between",}}>      
               <View>
                   <DashboardHeader navigation = {this.props.navigation}/>
               </View>  
                <ScrollView>
                    <View>
                        <NotesContainer navigation = {this.props.navigation}/>
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
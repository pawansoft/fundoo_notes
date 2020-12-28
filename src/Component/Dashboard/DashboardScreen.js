import React, { Component } from 'react';
import{
    View,
    ScrollView
} from 'react-native';
import BottomBar from './dashboardFooter';
import DashboardHeader from './DashboardHeader';
import NotesContainer from './NotesContainer';
import {Snackbar} from 'react-native-paper';

class DashboardScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            listView : true,
            showEmptyNoteSnackbar : false,
        }
    }

    async componentDidMount() {
       
        if(this.props.route.params != undefined) {
            if(this.props.route.params.isEmpty != undefined) {
            await this.setState({
                showEmptyNoteSnackbar : true
            })
            }
        }
        console.log(this.state.showEmptyNoteSnackbar);
    }
    
   snakbarHandler = async() => {
    const {onDismiss} = this.props
        await this.setState({ 
            showEmptyNoteSnackbar : false
        })
    this.props.navigation.setParams({isEmptyNote : false})
    onDismiss()
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
            <View style = {{flex: 1,  justifyContent: "space-between"}}>      
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
                <View>
                <Snackbar
                    style = {{marginBottom : 100}}
                    visible={this.state.showEmptyNoteSnackbar}
                    onDismiss={this.snakbarHandler}
                    duration = {10000}>
                    Empty Note Discarded
                </Snackbar>
                </View>
            </View>
        )
    }
}

export default DashboardScreen;
import React, { Component } from 'react';
import{
    View,
    Text,
    ScrollView
}from 'react-native';
import BottomBar from './dashboardFooter';
import DashboardHeader from './DashboardHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseService from '../../../Services/firebase_services/NoteServices';
import { Card, Paragraph, Title } from 'react-native-paper';
import NotesContainerStyle from '../../Style/NotesContainerStyle';

export default class Delete extends Component{
    constructor(props){
        super(props)
        this.state = {
            listView : true,
            notes: []
        }
    }

    async componentDidMount(){
        const userid = await AsyncStorage.getItem('userId');
        await FirebaseService._getNoteService(userid).then(async data => {
            let notes = data ? data : {}
            
            await this.setState({
                notes: notes
            })
        })
    }

    selectView = async () => {    
        await this.setState({
            listView : !this.state.listView
        })
        console.log(this.state.listView);
    }

    render(){
        let noteKey = Object.keys(this.state.notes);
        return(
            <View style = {{flex: 1}}>
                <View>
                    <DashboardHeader navigation = {this.props.navigation} onPress = {this.selectView} listView = {this.state.listView}/>
                </View>
                <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                { noteKey.length > 0 ?
                        noteKey.reverse().map(key => ( 
                            <React.Fragment key = {key}>
                                {this.state.notes[key].NotesDetail.isDeleted ? 
                                    (<Card 
                                        style={(this.state.listView) ? NotesContainerStyle.container_list : NotesContainerStyle.container}>
                                        <Card.Content>
                                            <Title>
                                                {this.state.notes[key].NotesDetail.title}
                                            </Title>
                                            <Paragraph>
                                                {this.state.notes[key].NotesDetail.note}
                                            </Paragraph>
                                        </Card.Content>  
                                    </Card>)
                                : null}
                            </React.Fragment>
                        )) 
                        :
                        null
                    }

                    </View>
                </ScrollView>
                <View >
                    <BottomBar navigation = {this.props.navigation}/>
                </View>
               
            </View>
        )
    }
}
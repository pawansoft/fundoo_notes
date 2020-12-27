import React,{ Component } from 'react';
import {
    View,
    Text, 
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { strings } from '../../Localization/Localization';
import RegisterStyle from '../../Style/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseService from '../../../Services/firebase_services/FirebaseService';
import {Card, Paragraph, Title} from 'react-native-paper'
import NotesContainerStyle from '../../Style/NotesContainerStyle';

export default class NotesContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            notes : []
        }
    }

    async componentDidMount(){
        const userid = await AsyncStorage.getItem('userId');
        await FirebaseService._getNoteService(userid).then(notes => {
            this.setState({
                notes : notes
            })
        })
    }

    SigninInsteadNavigationHandler = () => {
        this.props.navigation.navigate('Login')
    }

    goToResponsiveWebsiteNavigationHandle = () => {
        this.props.navigation.navigate('ResponsiveImg')
    }
    
    render(){
        let noteKey = Object.keys(this.state.notes);
        return(
            <View>               
                <ScrollView>
                    <View style = {{flexDirection : 'row', flexWrap : 'wrap'}}>
                        {noteKey.length > 0 ?
                            noteKey.map(key => (
                                <Card 
                                style = {(this.props.listview)? NotesContainerStyle.container_list : NotesContainerStyle.container}
                                key = {key}>
                                  <Card.Content>
                                      <Title style = {NotesContainerStyle.container_title}>
                                          {this.state.notes[key].Title}
                                      </Title>
                                      <Paragraph>
                                          {this.state.notes[key].Note}
                                      </Paragraph>

                                  </Card.Content>  
                                </Card>
                            ))
                            
                            :null
                        }

                    </View>
                </ScrollView>
                <TouchableOpacity style = {RegisterStyle.touchable_opacity_style}
                    onPress = {this.SigninInsteadNavigationHandler}>
                        <Text style ={RegisterStyle.button_text}> 
                            {strings.signin}
                        </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
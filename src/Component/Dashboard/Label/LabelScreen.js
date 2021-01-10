import React, { Component } from 'react'
import {View, Text, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Card, Paragraph, Title } from 'react-native-paper';
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService';
import backgroundImageStyle from '../../../Style/backgroundImageStyle';
import dashboardStyle from '../../../Style/dashboardStyle';
import LabelStyle from '../../../Style/LabelStyle';
import NotesContainerStyle from '../../../Style/NotesContainerStyle';
import BottomBar from '../DashboardScreen/dashboardFooter';

export default class LabelScreen extends Component{
    constructor (props){
        super(props)
        console.log(this.props.route.params);
        this.state = {
            listView: true,
            notesFromSQLite: [],
        }
    }

    componentDidMount = async() =>{
        await SQLiteCRUDService.getDetailsFromSQLiteDatabase()
            .then(async (data) => {
                var temp = []
                if (data.rows.length != 0) {
                    for (let i = 0; i < data.rows.length; ++i)
                        temp.push(data.rows.item(i));
                    await this.setState({
                        notesFromSQLite: temp
                    })
                }
            })
        console.log(this.state.notesFromSQLite);    
    }

    selectView = async () => {
        await this.setState({
            listView: !this.state.listView
        })
        console.log(this.state.listView);
    }

    handleSearch = () => {
        this.props.navigation.push('Home', { screen: 'Search'})
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                <Image style= { backgroundImageStyle.backgroundImage } source= {require('../../../assets/background1.jpg')}>
                </Image> 
                <Appbar style={dashboardStyle.headerContainer}>
                    <Appbar.Action
                        icon='menu'
                        onPress={() => this.props.navigation.openDrawer()} />

                    <Appbar.Content title={this.props.route.params.labelName} />
                    <Appbar.Action icon='magnify' 
                    onPress = {this.handleSearch}/>

                    <Appbar.Action
                        style={{ marginRight: 10 }}
                        icon={(this.state.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                        onPress={this.selectView} />
                    <Appbar.Action
                                icon='dots-vertical'
                                style={{ marginRight: 10 }}
                                onPress={this.handleRBSheetOpenButton} />
                </Appbar>
                <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.state.notesFromSQLite.length > 0 ? 
                        this.state.notesFromSQLite.map(note => 
                            note.Labels != null ? 
                            note.Labels.includes(this.props.route.params.labelId) ?
                            <React.Fragment key = {note.NoteKey}>
                                {console.log("inside render"+note.Labels)}
                                {<Card
                                    style={(this.state.listView) ? NotesContainerStyle.container_list : NotesContainerStyle.container}>
                                    <Card.Content style={{ backgroundColor: 'white' }}>
                                        <Title>
                                            {note.Title}
                                        </Title>
                                        <Paragraph>
                                            {note.Notes}
                                        </Paragraph>
                                        <View style = {LabelStyle.label_text_View}>
                                            <Text style = {LabelStyle.label_text}>
                                                {this.props.route.params.labelName}
                                            </Text>
                                        </View>
                                        
                                    </Card.Content>
                                </Card>}
                            </React.Fragment>
                              :null
                              :null
                            )
                    : null}
                </View>
                </ScrollView>
                <View>
                    <BottomBar navigation = {this.props.navigation}/>
                </View>
               
            </View>
        )
    }
}
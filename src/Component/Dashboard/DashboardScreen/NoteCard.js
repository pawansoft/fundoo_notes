import React, { Component } from 'react'
import {Text, View} from 'react-native'
import {Card, Title, Paragraph, ThemeProvider} from 'react-native-paper'
import SQLiteLabelServices from '../../../../Services/SQLite_service/SQLiteLabelServices'
import NotesContainerStyle from '../../../Style/NotesContainerStyle'
import NotesHolderStyle from '../../../Style/NotesHolderStyle'

export default class NoteCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            labelDetails: []
        }
        console.log(props);
    }

    componentDidMount = async() => {
        await SQLiteLabelServices.selectLabelFromSQliteStorage()
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    this.setState({
                        labelDetails: temp
                    })
                }                
            })
    }
    updateNote = (key, title, note, labels, archive) => {
        this.props.navigation.push('NewNotes',
            { key: key, title: title, note: note, selectedLabel: labels, updateNote: true, isArchive: archive})
    }

    render(){
        return(
                <Card
                 onPress={() => this.updateNote(this.props.notes.NoteKey, this.props.notes.Title, this.props.notes.Notes, this.props.notes.Labels, this.props.notes.isArchive)}
                style={(this.props.listView) ? NotesContainerStyle.container_list : NotesContainerStyle.container}>
                <Card.Content>
                    <Title style = {{color: 'black'}}>
                        {this.props.notes.Title}
                    </Title>
                    <Paragraph style = {{color: 'black'}}>
                        {this.props.notes.Notes}
                    </Paragraph>
                    <View style = {(this.props.listView)?NotesHolderStyle.label_text_container : NotesHolderStyle.label_text_grid}>
                        {(this.props.notes.Labels != undefined)? 
                            this.state.labelDetails.map(data =>
                                this.props.notes.Labels.includes(data.label_id) ?
                                    <React.Fragment key = {data.label_id}>
                                        <Text style={NotesHolderStyle.label_text}>{data.label}</Text>
                                    </React.Fragment>
                                :null
                                                        
                            ):null}
                        </View>
                </Card.Content>
            </Card>
        )
    }
}
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Card, Chip, Menu, Paragraph, Title } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import SQLiteCRUDService from '../../../../Services/SQLite_service/SQLiteCRUDService';
import SQLiteLabelServices from '../../../../Services/SQLite_service/SQLiteLabelServices';
import backgroundImageStyle from '../../../Style/backgroundImageStyle';
import dashboardStyle from '../../../Style/dashboardStyle';
import LabelStyle from '../../../Style/LabelStyle';
import NotesContainerStyle from '../../../Style/NotesContainerStyle';
import NotesHolderStyle from '../../../Style/NotesHolderStyle';
import BottomBar from '../DashboardScreen/dashboardFooter';
import moment from "moment"

export default class LabelScreen extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.route.params);
        this.state = {
            listView: true,
            notesFromSQLite: [],
            labelDetails: [],
        }
    }

    componentDidMount = async () => {
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
        await SQLiteLabelServices.selectLabelFromSQliteStorage()
            .then(async result => {
                var temp = [];
                if (result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    this.setState({
                        labelDetails: temp
                    })
                }
            })
    }

    selectView = async () => {
        await this.setState({
            listView: !this.state.listView
        })
        console.log(this.state.listView);
    }

    handleSearch = () => {
        this.props.navigation.push('Home', { screen: 'Search' })
    }

    handleRBSheetOpenButton = async () => {
        this.RBSheet.open();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image style={backgroundImageStyle.backgroundImage} source={require('../../../assets/background1.jpg')}>
                </Image>
                <Appbar style={dashboardStyle.headerContainer}>
                    <Appbar.Action
                        icon='menu'
                        onPress={() => this.props.navigation.openDrawer()} />

                    <Appbar.Content title={this.props.route.params.labelName} />
                    <Appbar.Action icon='magnify'
                        onPress={this.handleSearch} />

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
                                        <React.Fragment key={note.NoteKey}>
                                            {console.log("inside render" + note.Labels)}
                                            {<Card
                                                style={(this.state.listView) ? NotesContainerStyle.container_list : NotesContainerStyle.container}>
                                                <Card.Content style={{ backgroundColor: 'white' }}>
                                                    <Title>
                                                        {note.Title}
                                                    </Title>
                                                    <Paragraph>
                                                        {note.Notes}
                                                    </Paragraph>
                                                    <View style={(this.state.listView) ? NotesHolderStyle.label_text_container : NotesHolderStyle.label_text_grid}>
                                                        <Chip
                                                            icon='alarm'
                                                            style={{ backgroundColor: '#e6b800' }}>
                                                            {moment(JSON.parse(note.Reminder)).format('D MMM, h.mm a')}
                                                        </Chip>
                                                    </View>

                                                    <View style={(this.state.listView) ? NotesHolderStyle.label_text_container : NotesHolderStyle.label_text_grid}>
                                                        {(note.Labels != undefined) ?
                                                            this.state.labelDetails.map(val =>
                                                                note.Labels.includes(val.label_id) ?
                                                                    <React.Fragment key={val.label_id}>
                                                                        {console.log("inside render" + val)}
                                                                        <Text style={NotesHolderStyle.label_text}>{val.label}</Text>
                                                                    </React.Fragment>
                                                                    : null
                                                            )
                                                            : null
                                                        }
                                                    </View>

                                                </Card.Content>
                                            </Card>}
                                        </React.Fragment>
                                        : null
                                    : null
                            )
                            : null}
                    </View>
                </ScrollView>
                <RBSheet
                    ref={ref => { this.RBSheet = ref }}
                    height={250}
                    customStyles={{
                        container: {
                            // marginBottom: 50,
                            // borderTopWidth: 1,
                            // borderColor: "#d3d3d3",

                        },
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                    }}>
                    <View>
                        <Menu.Item icon="delete-outline" title="Delete"
                            style={NotesContainerStyle.snakbarButton}
                            onPress={this.handleDeleteNoteButton} />
                        <Menu.Item icon="content-copy" title="Make a copy" />
                        <Menu.Item icon="share-variant" title="Send" />
                        <Menu.Item icon="label-outline" title="Labels"
                            onPress={this.handleSelectLabel} />
                    </View>
                </RBSheet>
                <View>
                    <BottomBar navigation={this.props.navigation} />
                </View>

            </View>
        )
    }
}
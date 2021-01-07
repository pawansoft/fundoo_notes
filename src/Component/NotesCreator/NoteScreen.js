import React from 'react';
import NewNotes from './NewNotes';


const NoteScreen = ({ navigation, route }) => {
    return (
        <NewNotes navigation={navigation} route={route} />
    )
}
export default NoteScreen;
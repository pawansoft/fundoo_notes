import { STORE_USERID, STORE_LABEL_CONTENT, STORE_LABELS, NOTE_KEYS } from '../actions/CreateNewLabelType'
const initialState = {
    userId : '',
    labelContent: [],
    labelNoteKeys: [],
    labels: []
}

const CreateNewLabelReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERID:
            return {
                ...state,
                userId : action.payload,
            }
        case STORE_LABEL_CONTENT:
            return {
                ...state,
                labelContent : action.payload,
            }
        case NOTE_KEYS:
            return {
                ...state,
                labelNoteKeys : action.payload
            }
        case STORE_LABELS:
            return {
                ...state,
                labels : action.payload
            }
        default:
            return state;
    }
}

export default CreateNewLabelReducer;
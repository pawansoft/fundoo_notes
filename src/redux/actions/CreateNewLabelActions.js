
import {STORE_USERID, STORE_LABEL_CONTENT, NOTE_KEYS, STORE_LABELS} from './CreateNewLabelType';

export const storeUserID = (userId) => {
    return {
        type : STORE_USERID,
        payload : userId
    }
}

export const storeLabelContent = (labelContent) => {
    return {
        type : STORE_LABEL_CONTENT,
        payload : labelContent
    }
}

export const storeNoteKeys = (labelNoteKeys) => {
    return {
        type : NOTE_KEYS,
        payload : labelNoteKeys
    }
}

export const storeLabels = (labels) => {
    return {
        type : STORE_LABELS,
        payload : labels
    }
}
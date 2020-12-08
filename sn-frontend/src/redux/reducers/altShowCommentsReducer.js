import { ALT_SHOW_COMMENTS } from '../actions/actionTypes'

const initialState = {
    showComments: false
}

export const altShowCommentsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case ALT_SHOW_COMMENTS :
            return { ...state, showComments: action.newValue }
        default:
            return state
    }
}
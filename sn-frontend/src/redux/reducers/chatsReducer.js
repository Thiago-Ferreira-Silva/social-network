import { CHATS } from '../actions/actionTypes'

const initialState = {
    chats: {}
}

export const chatsReducer = (state = initialState, action) => {
    if (action.type === CHATS) {
        return {
            ...state,
            chats: action.newValue
        }
    }
    return state
}
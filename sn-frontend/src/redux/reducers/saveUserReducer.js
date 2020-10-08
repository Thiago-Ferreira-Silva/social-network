import { SAVE_USER } from '../actions/actionTypes'

const initialState = {
    user: {}
}

export const saveUserReducer = ( state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                user: action.newValue
            }
        default:
            return state
    }
}
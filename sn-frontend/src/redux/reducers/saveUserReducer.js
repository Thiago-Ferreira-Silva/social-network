import axios from 'axios'
import { SAVE_USER } from '../actions/actionTypes'

const initialState = {
    user: {}
}

export const saveUserReducer = (state = initialState, action) => {
    if (action.type === SAVE_USER) {
        if (action.newValue !== {}) {
            axios.defaults.headers.common['Authorization'] = `bearer ${action.newValue.token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
        return {
            ...state,
            user: action.newValue
        }
    }
    return state
}
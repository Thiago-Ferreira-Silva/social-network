import { UPDATE_POSTS } from '../actions/actionTypes'

const initialState = {
    updatePosts: false
}

export const updateReducer = ( state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSTS:
            if (action.newValue) {
                return { ...state, updatePosts: action.newValue }
            }
            return { ...state }
        default:
            return state
    }
}
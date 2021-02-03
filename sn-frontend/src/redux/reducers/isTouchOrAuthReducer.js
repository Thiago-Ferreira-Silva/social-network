import { IS_TOUCH, IS_AUTH } from "../actions/actionTypes"

const initialState = {
    isTouch: false,
    isAuth: true
}

export const isTouchOrAuthReducer = ( state = initialState, action) => {
    if (action.type === IS_TOUCH) {
        return {
            ...state,
            isTouch: action.newValue
        }
    } else if (action.type === IS_AUTH) {
        return {
            ...state,
            isAuth: action.newValue
        }
    }
    return state
}
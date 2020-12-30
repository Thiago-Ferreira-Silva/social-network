import { IS_TOUCH } from "../actions/actionTypes"

const initialState = {
    isTouch: false
}

export const isTouchReducer = ( state = initialState, action) => {
    if (action.type === IS_TOUCH) {
        return {
            ...state,
            isTouch: action.newValue
        }
    }
    return state
}
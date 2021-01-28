import { combineReducers } from 'redux'

import { saveUserReducer } from './saveUserReducer'
import { isTouchReducer } from './isTouchReducer'

export const Reducers = combineReducers({
    userState: saveUserReducer,
    isTouchState: isTouchReducer
})
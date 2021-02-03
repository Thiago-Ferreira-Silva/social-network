import { combineReducers } from 'redux'

import { saveUserReducer } from './saveUserReducer'
import { isTouchOrAuthReducer } from './isTouchOrAuthReducer'

export const Reducers = combineReducers({
    userState: saveUserReducer,
    isTouchOrAuthState: isTouchOrAuthReducer
})
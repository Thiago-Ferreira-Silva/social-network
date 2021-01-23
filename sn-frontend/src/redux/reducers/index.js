import { combineReducers } from 'redux'

import { saveUserReducer } from './saveUserReducer'
import { isTouchReducer } from './isTouchReducer'
import { chatsReducer } from './chatsReducer'

export const Reducers = combineReducers({
    userState: saveUserReducer,
    isTouchState: isTouchReducer,
    chatsState: chatsReducer
})
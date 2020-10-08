import { combineReducers } from 'redux'

import { saveUserReducer } from './saveUserReducer'

export const Reducers = combineReducers({
    userState: saveUserReducer
})
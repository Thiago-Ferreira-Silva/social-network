import { combineReducers } from 'redux'

import { saveUserReducer } from './saveUserReducer'
import { updateReducer } from './updateReducer'

export const Reducers = combineReducers({
    userState: saveUserReducer,
    updateState: updateReducer
})
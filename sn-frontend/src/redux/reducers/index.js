import { combineReducers } from 'redux'

import { saveUserReducer } from './saveUserReducer'
import { altShowCommentsReducer } from './altShowCommentsReducer'

export const Reducers = combineReducers({
    userState: saveUserReducer,
    showCommentsState: altShowCommentsReducer
})
import { combineReducers } from 'redux'

import { saveUser } from './saveUser'

export const Reducers = combineReducers({
    userState: saveUser
})
import { SAVE_USER } from './actionTypes'

export const saveUser = user => ({
    type: SAVE_USER,
    newValue: user
})
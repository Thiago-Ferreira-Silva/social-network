import { SAVE_USER } from './actionTypes'
import { UPDATE_POSTS } from './actionTypes'

export const saveUser = user => ({
    type: SAVE_USER,
    newValue: user
})

export const updatePosts = update => ({
    type: UPDATE_POSTS,
    newValue: update
})
import { SAVE_USER, ALT_SHOW_COMMENTS } from './actionTypes'

export const saveUser = user => ({
    type: SAVE_USER,
    newValue: user
})

export const altShowComments = showComments => ({
    type: ALT_SHOW_COMMENTS,
    newValue: showComments
})
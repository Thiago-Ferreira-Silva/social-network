import { IS_TOUCH, SAVE_USER, CHATS } from './actionTypes'

export const saveUser = user => ({
    type: SAVE_USER,
    newValue: user
})

export const checkIfIsTouch = isTouch => ({
    type: IS_TOUCH,
    newValue: isTouch
})

export const updateChats = chats => ({
    type: CHATS,
    newValue: chats
})
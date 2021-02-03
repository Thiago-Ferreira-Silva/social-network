import { IS_AUTH, IS_TOUCH, SAVE_USER } from './actionTypes'

export const saveUser = user => ({
    type: SAVE_USER,
    newValue: user
})

export const checkIfIsTouch = isTouch => ({
    type: IS_TOUCH,
    newValue: isTouch
})

export const checkIfIsAuth = isAuth => ({
    type: IS_AUTH,
    newValue: isAuth
})
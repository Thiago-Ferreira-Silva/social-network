import axios from 'axios'
import { notify } from '../global'
import { Store } from '../redux/store'
import { saveUser } from '../redux/actions'

function getData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            resolve(reader.result)
        })
        reader.addEventListener('error', err => reject(err))

        reader.readAsDataURL(file)
    })
}

function uploadPicture( image, url ) {
    //.match(/.{1,10000}/g)
    const pic = { 'image': image }
    axios.post(url, pic)
        .then(_ => {
            const state = Store.getState()
            const user = state.userState.user
            user.profilePicture = image
            Store.dispatch(saveUser(user))
            notify('Image uploaded')
        })
        .catch(err => notify(err, 'error'))
}

export async function handleImage(file, url, maxWidth, maxHeight ,callback) {
    const image = getData(file)
    console.log(image)
    uploadPicture( image, url )
}
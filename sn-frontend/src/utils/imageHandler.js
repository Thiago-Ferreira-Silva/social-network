import axios from 'axios'
import Resizer from 'react-image-file-resizer'
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

export async function handleImage(file, url, maxWidth, maxHeight, minWidth, minHeight ,callback) {
    const image = await getData(file)
    await Resizer.imageFileResizer(file, maxWidth, maxHeight, 'JPEG', 100, 0, resizedImage => uploadPicture( resizedImage, url ), 'base64', minWidth, minHeight)   
}
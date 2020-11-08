import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { notify } from '../global'

function uploadPicture( image, url, callback ) {
    //.match(/.{1,10000}/g)
    const pic = { 'image': image }
    axios.post(url, pic)
        .then(_ => {
            callback(image)
            notify('Image uploaded')
        })
        .catch(err => notify(err, 'error'))
}

export async function handleImage(file, url, maxWidth, maxHeight, minWidth, minHeight ,callback) {
    await Resizer.imageFileResizer(file, maxWidth, maxHeight, 'JPEG', 100, 0, resizedImage => uploadPicture( resizedImage, url, callback ), 'base64', minWidth, minHeight)   
}

//precisa de umas modificações para ficar mais versátil, por exenplo, colocar todo o conteúdo do 'then' de uploadPicture na callback no componente
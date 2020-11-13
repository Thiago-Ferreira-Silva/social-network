import Resizer from 'react-image-file-resizer'

export async function resizeImage(file, maxWidth, maxHeight, minWidth, minHeight ,callback) {
    await Resizer.imageFileResizer(file, maxWidth, maxHeight, 'JPEG', 100, 0, resizedImage => callback(resizedImage), 'base64', minWidth, minHeight)   
}
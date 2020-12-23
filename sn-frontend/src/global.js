import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import { io } from 'socket.io-client'

toast.configure()
export const baseApiUrl = 'http://localhost:8081'

//export const socket = io(baseApiUrl)
//socket.emit('message', 'message')
//console.log(socket)

export const notify = (msg, type) => {
    if (type === 'error') {
        if (msg && msg.response && msg.response.data) {
            toast.error(msg.response.data, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true })
        } else if (typeof msg === 'string') {
            toast.error(msg, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true })
        } else {
            console.log(msg)
            toast.error('An error ocurred.', { autoClose: 2000, pauseOnHover: false, hideProgressBar: true })
        }
    }
    if (msg) {
        toast.success(msg, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true })
    } else {
        toast.success('Success', { autoClose: 2000, pauseOnHover: false, hideProgressBar: true })
    }
}
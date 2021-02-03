import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export const baseApiUrl = process.env.baseApiUrl || 'http://localhost:8081'

export const notify = (msg, type) => {
    if (type === 'error') {
        if (msg && msg.response && msg.response.data) {
            toast.error(msg.response.data, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true })
        } else if (typeof msg === 'string') {
            toast.error(msg, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true })
        } else {
            toast.error('An error ocurred.', { autoClose: 2000, pauseOnHover: false, hideProgressBar: true })
        }
    }
    if (msg) {
        toast.success(msg, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true })
    } else {
        toast.success('Success', { autoClose: 2000, pauseOnHover: false, hideProgressBar: true })
    }
}
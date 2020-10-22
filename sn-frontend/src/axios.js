import axios from 'axios'
import { Store } from './redux/store'
import { saveUser } from './redux/actions'

const success = res => res
const error = err => {
    if (401 === err.response.status) {
        Store.dispatch(saveUser({}))
        window.location = '/auth'
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)
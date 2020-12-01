import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Store, persistor } from './redux/store'
import axios from 'axios'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/template/Header'
import Content from './components/template/Content'
import Footer from './components/template/Footer'

import { BrowserRouter } from 'react-router-dom'
import Loading from './components/template/Loading'

const setToken = () => {
  axios.defaults.headers.common['Authorization'] = `bearer ${Store.getState().userState.user.token}`
}

ReactDOM.render(
  <Provider store={Store}>
    <PersistGate loading={<Loading />} persistor={persistor} onBeforeLift={setToken}>
      <BrowserRouter>
        <React.StrictMode>
          <Header />
          <Content />
          <Footer />
        </React.StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();

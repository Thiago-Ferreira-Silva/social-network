import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Store, persistor } from './redux/store'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './axios'
import Header from './components/template/Header'
import Content from './components/template/Content'
import Footer from './components/template/Footer'


import { BrowserRouter } from 'react-router-dom'
import Loading from './components/template/Loading'

ReactDOM.render(
  <Provider store={Store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
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

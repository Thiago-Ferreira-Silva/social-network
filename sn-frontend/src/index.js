import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { Store } from './redux/store'

import './index.css'
import Header from './components/template/Header'
import Content from './components/template/Content'
import Footer from './components/template/Footer'


import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <React.StrictMode>
        <Header />
        <Content />
        <Footer />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();

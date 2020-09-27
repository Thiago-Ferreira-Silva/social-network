import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { Store } from './redux/store'

import './index.css'
import Header from './components/template/Header'
import Content from './components/template/Content'
import Footer from './components/template/Footer'
import Home from './components/home/Home'
import Auth from './components/auth/Auth'

// não está funcionando
ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <Content>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/auth" exact={true} component={Auth} />
          </Switch>
        </Content>
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();

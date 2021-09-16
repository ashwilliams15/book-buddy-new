import ReactDOM from 'react-dom';
import App from './components/App';
import React from 'react';
import { Provider }from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import '../public/style.css'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
)

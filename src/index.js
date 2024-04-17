// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import configStore from './Store/ConfigStore';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'

const store = configStore()


store.subscribe(()=>{
  console.log(store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);

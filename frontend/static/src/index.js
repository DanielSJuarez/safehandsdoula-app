import React from 'react';
import ReactDOM from 'react-dom';
import { browserRouter, Routes, Route, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Login from './components/login';
import Register from './components/register';
import reportWebVitals from './reportWebVitals';
import CreateProfile  from './components/createProfile'
import Home from './components/home'
import DoulaProfile from './components/doulaProfile'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='' element={<Home/>}/>
          <Route path='home' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='create' element={<CreateProfile/>}/>
          <Route path='profile' element={<DoulaProfile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

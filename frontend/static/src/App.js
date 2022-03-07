import './App.css';
import { InlineWidget } from "react-calendly";
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Header from './components/header';

function App() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [createDoula, setCreateDoula] = useState(false)
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));

  // fetch('https://auth.calendly.com/oauth/authorize?client_id=JSdPVXJHqifv4b4gG72AIbwFffPxzlLG2D1RcfAJoIg&response_type=code&redirect_uri=https://safehandsdoula.com', {
  //   "method": "GET",
  //   "headers": {
  //     "Content-Type": "application/json"
  //   }
  // })
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   })

  const getToken = async () => {
    fetch("https://auth.calendly.com/oauth/token", {
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "body": {
        code: 'fAo-sweuOmCiyHpe3qvduqDPKKmbpJG1de23qtpH3vM',
        client_id: 'JSdPVXJHqifv4b4gG72AIbwFffPxzlLG2D1RcfAJoIg',
        client_secret: 'OhevgwurwaW6Werlv9o3WPYMvyJuEP7PZkxqVKRkPYY',
        redirect_uri: 'https://safehandsdoula.com',
        grant_type: 'authorization_code',

      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <>
      <Header setCreateDoula={setCreateDoula}/>
      <div className="App">
        <a target='blank' href='https://auth.calendly.com/oauth/authorize?client_id=JSdPVXJHqifv4b4gG72AIbwFffPxzlLG2D1RcfAJoIg&response_type=code&redirect_uri=https://safehandsdoula.com'>Link Calandly Account</a>
        <button type='button' onClick={() => getToken}>Get token</button>
        <div className="ApiTest">
          <InlineWidget url='https://calendly.com/chandler-enok/30-minutes' />
        </div>
      </div>
      <Outlet context={[auth, setAuth, navigate, createDoula, setCreateDoula]} />
    </>
  );
}

export default App;

import './App.css';
import { InlineWidget } from "react-calendly";
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Header from './components/header';

function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const [createDoula, setCreateDoula] = useState(false)
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
  const [isDoula, setIsDoula] = useState(false)

  const handleError = (err) => {
    console.log(err);
  }

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
    const code = searchParams.get('code')

    const accessRequest = {
      code: code,
      client_id: 'UTvsFK4siqWhllb81txrCJ7kdqyA9ayq6Jr10QUmZec',
      client_secret: 'nFNB3IGLpLUQYOmtb4c_AZldv1NvuSTSVg_19ncy8kU',
      redirect_uri: 'http://localhost:3000/',
      grant_type: 'authorization_code',
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(accessRequest)
    }

    const response = await fetch('https://auth.calendly.com/oauth/token', options).catch(
      handleError
    )

    if (!response.ok) {
      throw new Error('Network response not ok!');
    } else {
      const data = await response.json();
      console.log(data)
    }
  }

  // const getToken = async () => {
  //   const code = searchParams.get('code')

  //   const accessRequest = {
  //     code: code,
  //     client_id: 'UTvsFK4siqWhllb81txrCJ7kdqyA9ayq6Jr10QUmZec',
  //     client_secret: 'nFNB3IGLpLUQYOmtb4c_AZldv1NvuSTSVg_19ncy8kU',
  //     redirect_uri: 'http://localhost:3000/',
  //     grant_type: 'authorization_code',
  //   }

  //   fetch("https://auth.calendly.com/oauth/token", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     body: accessRequest
  //   })
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });

  //   }

    return (
      <>
        <Header setCreateDoula={setCreateDoula} isDoula={isDoula} setIsDoula={setIsDoula} auth={auth} setAuth={setAuth} navigate={navigate} />
        <div className="App">
          <a target='blank' href='https://auth.calendly.com/oauth/authorize?client_id=UTvsFK4siqWhllb81txrCJ7kdqyA9ayq6Jr10QUmZec&response_type=code&redirect_uri=http://localhost:3000/'>Link Calandly Account</a>
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

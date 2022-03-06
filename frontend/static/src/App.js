import logo from './logo.svg';
import './App.css';
import { InlineWidget } from "react-calendly";
import { Link } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [code, setCode] = useState('')
 
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

  const getToken = async (code) => {
    fetch("https://auth.calendly.com/oauth/token", {
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "body": {
        code: {code},
        client_id : 'JSdPVXJHqifv4b4gG72AIbwFffPxzlLG2D1RcfAJoIg',
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <>

        <a target='blank' href='https://auth.calendly.com/oauth/authorize?client_id=JSdPVXJHqifv4b4gG72AIbwFffPxzlLG2D1RcfAJoIg&response_type=code&redirect_uri=https://safehandsdoula.com'>Link Calandly Account</a>

      </>
      <div className="ApiTest">
        <InlineWidget url='https://calendly.com/chandler-enok/30-minutes' />
      </div>
    </div>
  );
}

export default App;

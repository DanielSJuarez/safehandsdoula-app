import './App.css';
// import { InlineWidget } from "react-calendly";
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
  const [preview, setPreview] = useState('/media/doula/download.jpeg');
  const [profileImg, setProfileImg] = useState(null)
  const [isSummary, setIsSummary] = useState(false)
  const [isSuperUser, setIsSuperUser] = useState(false)
 
  const handleError = (err) => {
    console.log(err);
  }

  return (
    <>
      <Header setCreateDoula={setCreateDoula} isDoula={isDoula} setIsDoula={setIsDoula} auth={auth} setAuth={setAuth} navigate={navigate} profileImg={profileImg} setProfileImg={setProfileImg} handleError={handleError} isSummary={isSummary} setIsSummary={setIsSummary} isSuperUser={isSuperUser} setIsSuperUser={setIsSuperUser} setPreview={setPreview}/>
      <div className="App"></div>
      <Outlet context={{auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary , isSuperUser, setIsSuperUser}} />
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

function Calendly() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary , isSuperUser, setIsSuperUser] = useOutletContext();
    // const { navigate} = useOutletContext();
    return (
        <>
        <div className='col loginField'>
            <a target='blank' href='https://auth.calendly.com/oauth/authorize?client_id=UTvsFK4siqWhllb81txrCJ7kdqyA9ayq6Jr10QUmZec&response_type=code&redirect_uri=http://localhost:3000/'>Link Calendly Account</a>
        </div>
        <button type='button' onClick={()=>  navigate('/home')}>Later</button>
        </>
    )
}

export default Calendly

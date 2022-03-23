import { useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'

function Calendly() {
    const { auth, navigate, handleError, setProfileImg } = useOutletContext();

    useEffect(() => {
        const isDoula = async () => {
            const response = await fetch(`${base_URL}/api/v1/accounts/doula/`).catch(handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                console.log(data)
                if (data.length > 0 && data[0].is_doula === true) {
                    setProfileImg(data[0].image)
                }
            }
        }
        if (auth) {
            isDoula();
        }
    }, [])

    return (
        <>
            <div className='loginPlacholder'>
                <div className='col loginField'>
                    <a target='blank' href='https://auth.calendly.com/oauth/authorize?client_id=UTvsFK4siqWhllb81txrCJ7kdqyA9ayq6Jr10QUmZec&response_type=code&redirect_uri=http://localhost:3000/'>Link Calendly Account</a>
                </div>
                <div className='col loginField'>
                    <button className='loginRegisterButton' type='button' onClick={() => navigate('/home')}>Later</button>
                </div>
            </div>
            <div className='pageSupport'>
                <p>“The wonder of life begins in the womb of a woman.” - Lailah Gifty Akita</p>
            </div>
        </>
    )
}

export default Calendly

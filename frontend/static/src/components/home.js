import { useOutletContext } from "react-router-dom";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { base_URL } from '../config/settings'

function Home() {
    // const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, , isSuperUser, setIsSuperUser] = useOutletContext();
    const { auth, navigate, setIsDoula, searchParams, handleError, setProfileImg } = useOutletContext();
    useEffect(() => {
        console.log(base_URL)
        let id = ''
        const isDoula = async () => {

            const response = await fetch(`${base_URL}/api/v1/accounts/doula/`).catch(handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                console.log(data)
                if (data.length > 0 && data[0].is_doula === true) {
                    setIsDoula(true)
                    id = data[0].id
                    setProfileImg(data[0].image)
                    if (searchParams.get('code') != null) {
                        getToken(id);
                    }
                }
            }
        }
        const getToken = async (id) => {

            const code = searchParams.get('code')

            const data = new URLSearchParams(code);
            data.append('code', code);
            data.append('client_id', 'UTvsFK4siqWhllb81txrCJ7kdqyA9ayq6Jr10QUmZec');
            data.append('client_secret', 'nFNB3IGLpLUQYOmtb4c_AZldv1NvuSTSVg_19ncy8kU');
            data.append('redirect_uri', 'http://localhost:3000/');
            data.append('grant_type', 'authorization_code')

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: data
            }

            const response = await fetch('https://auth.calendly.com/oauth/token', options).catch(
                handleError
            )

            if (!response.ok) {
                throw new Error('Network response not ok!');
            } else {
                const data = await response.json();
                const token = data.access_token
                getSchedule(token, id);
            }
        }
        if (auth) {
            isDoula();
        }
    }, []);

    const getSchedule = async (token, id) => {
        let schedule = ''
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }

        const response = await fetch('https://api.calendly.com/users/me', options).catch(
            handleError
        )

        if (!response.ok) {
            throw new Error('Network response not ok!');
        } else {
            const data = await response.json();
            schedule = data.resource.scheduling_url
            setCalendly(id, schedule)
        }
    }

    const setCalendly = async (id, schedule) => {

        const formData = new FormData();
        formData.append('calendly', schedule);
        formData.append('linked', true);
        formData.append('display_calendly', true);

        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData
        }

        const response = await fetch(`${base_URL}/api/v1/accounts/${id}/doula/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
    }

    return (
        <>
            <div className="container">
                <div className="homeArticleOne" onClick={() => navigate('/what')}>
                    <div>
                        <img className="articleImage" src='/media/doula/doulaArticleTwo.jpeg' alt='homeImage' />
                    
                    <p className="articleHeader">What is a doula, and what can we do for you</p></div></div>
                <div className="homeArticleTwo" onClick={() => navigate('/how')}>
                    <div>
                        <img  className="articleImage" src='/media/doula/doulaArticleTwo.jpeg' alt='homeImage' />
                    </div>
                    Article Two</div>
                <div className="homeArticleOne" onClick={() => navigate('/why')}>
                    <div>
                        <img src='/media/doula/doulaArticleTwo.jpeg' alt='homeImage' />
                    </div>
                    Article Three</div>
                <div className="homeArticleTwo" onClick={() => navigate('/how')}>
                    <div>
                        <img src='/media/doula/doulaArticleTwo.jpeg' alt='homeImage' />
                    </div>
                    Find a Doula</div>
                <div className="homeArticleOne" onClick={() => navigate('/register')}><div>
                    <img src='/media/doula/doulaArticleTwo.jpeg' alt='homeImage' />
                </div>
                    Register</div>
                <div className='pageSupport'>
                    <p>“The so called miracle of birth is nature getting her own way.” - Camille Paglia</p>
                </div>
            </div>
        </>
    )
}

export default Home
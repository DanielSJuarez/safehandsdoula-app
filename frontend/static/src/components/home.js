import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { base_URL } from '../config/settings'

function Home() {
    const { auth, navigate, setIsDoula, searchParams, handleError, setProfileImg } = useOutletContext();
    const [articleOneHeader, setArticleOneHeader] = useState(null)
    const [articleTwoHeader, setArticleTwoHeader] = useState(null)
    const [articleThreeHeader, setArticleThreeHeader] = useState(null)
    const [articleFourHeader, setArticleFourHeader] = useState(null)
    const [articleFiveHeader, setArticleFiveHeader] = useState(null)

    useEffect(() => {
        const getHomePage = async () => {

            const response = await fetch(`${base_URL}/api/v1/homepage/`).catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setArticleOneHeader(data[0].imageHomeOne)
                setArticleTwoHeader(data[0].imageHomeTwo)
                setArticleThreeHeader(data[0].imageHomeThree)
                setArticleFourHeader(data[0].imageHomeFour)
                setArticleFiveHeader(data[0].imageHomeFive)
            }
        }
        getHomePage();
    }, []);

    useEffect(() => {
        let id = ''
        const isDoula = async () => {

            const response = await fetch(`${base_URL}/api/v1/accounts/doula/`).catch(handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                
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
            data.append('client_id', 'JSdPVXJHqifv4b4gG72AIbwFffPxzlLG2D1RcfAJoIg');
            data.append('client_secret', 'OhevgwurwaW6Werlv9o3WPYMvyJuEP7PZkxqVKRkPYY');
            data.append('redirect_uri', 'https://safehandsdoula.com');
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
                <div className="homeArticleTwo row mx-0" onClick={() => navigate('/doula')}>
                    <div className="homeArticleTwoImage col-8">
                        <img className="articleImage" src={articleOneHeader} alt='homeImage' />
                    </div>
                    <p className="homeArticleTwoSub col-4">Who will be your best fit?</p>
                    <p className="homeArticleTwoTitle col-12">Find a Doula for you</p>
                </div>
                <div className="homeArticleOne row mx-0" onClick={() => navigate('/what')}>
                    <div className="homeArticleTwoImage col-8">
                        <img className="articleImage" src={articleTwoHeader} alt='homeImage' />

                    </div>
                    <p className="homeArticleTwoSub col-4">Let me show you</p>
                    <p className="homeArticleTwoTitle col-12">What is a doula, and what can we do for you?</p>
                </div>
                <div className="homeArticleTwo row mx-0" onClick={() => navigate('/how')}>
                    <div className="homeArticleTwoImage col-8">
                        <img className="articleImage" src={articleThreeHeader} alt='homeImage' />
                    </div>
                    <p className="homeArticleTwoSub col-4">What to expect from the experience</p>
                    <p className="homeArticleTwoTitle col-12">How can a Doula serve you?</p>
                </div>
                <div className="homeArticleOne row mx-0" onClick={() => navigate('/why')}>
                    <div className="homeArticleTwoImage col-8">
                        <img className="articleImage" src={articleFourHeader} alt='homeImage' />
                    </div>
                    <p className="homeArticleTwoSub col-4">What even is the point?</p>
                    <p className="homeArticleTwoTitle col-12">Why would you use a doula? What are the benefits?</p>
                </div>
                <div className="homeArticleOne row mx-0" onClick={() => navigate('/register')}>
                    <div className="homeArticleTwoImage col-8">
                        <img className="articleImage" src={articleFiveHeader} alt='homeImage' />
                    </div>
                    <p className="homeArticleTwoSub col-4">Join our community</p>
                    <p className="homeArticleTwoTitle col-12">Are you a doula, and want to join the Safehandsdoula community?</p>
                </div>
                <div className='pageSupport'>
                    <p>“The so called miracle of birth is nature getting her own way.” - Camille Paglia</p>
                </div>
            </div>
        </>
    )
}

export default Home
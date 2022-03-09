import { useOutletContext } from "react-router-dom";
import { useState,useEffect } from 'react';
import Cookies, { attributes } from 'js-cookie';

function Home() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams] = useOutletContext();
    const [token, setToken] = useState('')
    const [schedule, setSchedule] = useState('')
    const [code, setCode] = useState('')
    const [id, setId] = useState(null)
    const [addImage, setAddImage] = useState(null);
    const [newIsName, setNewIsName] = useState('');
    const [newAbout, setNewAbout] = useState('');
    const [newStarted, setNewStarted] = useState('');
    const [newCertification, setNewCertification] = useState('')
    const [newFacebook, setNewFacebook] = useState('')
    const [newTwitter, setNewTwitter] = useState('')
    const [newInstagram, setNewInstagram] = useState('')
    const [newWebsite, setNewWebsite] = useState('')
    const [newServices, setNewServices] = useState('')
    const [newWhy, setNewWhy] = useState('')


    const handleError = (err) => {
        console.log(err);
    }

    useEffect(() => {
        const isDoula = async () => {
            const response = await fetch('/api/v1/accounts/doula/').catch(handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                if (data[0].is_doula == true) {
                    setIsDoula(true)
                    setId(data[0].id)
                }
            }
        }
        isDoula();
    }, []);


    useEffect(() => {
        const getToken = async () => {
            // const code = searchParams.get('code')
            setCode(searchParams.get('code'))

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
                console.log(data)
                setToken(data.access_token)
                getSchedule();
            }
        }
        console.log(token)
        const getSchedule = async () => {
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
                setSchedule(data.resource.scheduling_url)
                editProfile(id)
            }
        }
        if (searchParams.get('code') != null) {
            getToken();
        }
    }, []);


    const editProfile = async (id) => {

        const updatedprofile = {
            name: newIsName,
            about: newAbout,
            started: newStarted,
            image: addImage,
            services: newServices,
            why: newWhy,
            calendly: schedule,
            website: newWebsite,
            facebook: newFacebook,
            twitter: newTwitter,
            instagram: newInstagram,
            certification: newCertification,
        }

        const formData = new FormData();
        for (const [key, value] of Object.entries(updatedprofile)) {
            if (value) {
                formData.append(key, value)
            }
        }

        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData
        }

        const response = await fetch(`/api/v1/accounts/${id}/doula/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        } 
        setAddImage('');
        setNewIsName('');
        setNewAbout('');
        setNewStarted('');
        setNewServices('');
        setNewWhy('');
        setNewWebsite('');
        setNewFacebook('');
        setNewTwitter('');
        setNewInstagram('');
        setNewCertification('')
        setCode(null)
        setSchedule('')
        setToken('')
    }

    return (
        <div>I am the home page</div>
    )
}

export default Home
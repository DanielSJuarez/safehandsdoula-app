import { useState, useEffect } from 'react';
import Cookies, { attributes } from 'js-cookie';
import { useOutletContext } from "react-router-dom";

function CreateProfile() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams] = useOutletContext();
    const [addImage, setAddImage] = useState(null);
    const [isName, setIsName] = useState('');
    const [about, setAbout] = useState('');
    const [started, setStarted] = useState('');
    const [preview, setPreview] = useState('');
    const [certification, setCertification] = useState('')
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const [website, setWebsite] = useState('')
    const [services, setServices] = useState('')
    const [why, setWhy] = useState('')
    const [token, setToken] = useState('')
    const [schedule, setSchedule] = useState('')
    const [code, setCode] = useState('')

    const handleError = (err) => {
        console.log(err);
    }

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
            }
        }
        if (searchParams.get('code') != null) {
            getToken();
        }
        // getToken();
    }, []);


    const handleImage = e => {

        const file = e.target.files[0];
        setAddImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(file);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', isName);
        formData.append('about', about);
        formData.append('started', started);
        formData.append('image', addImage);
        formData.append('services', services);
        formData.append('why', why);
        formData.append('website', website);
        formData.append('facebook', facebook);
        formData.append('calendly', schedule)
        formData.append('twitter', twitter);
        formData.append('instagram', instagram);
        formData.append('is_doula', true);
        formData.append('certification', certification);

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        fetch('/api/v1/accounts/doula/', options);
        e.target.reset();
        setPreview('');
        setAddImage('');
        setIsName('');
        setAbout('');
        setStarted('');
        setServices('');
        setWhy('');
        setWebsite('');
        setFacebook('');
        setTwitter('');
        setInstagram('');
        setCertification('')
        setCreateDoula(false);
        setIsDoula(true);
        navigate('/home')
    }

    return (
        <>
            <div className='loginPlacholder'>
                <h2>Your Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className='col loginField'>
                        <input className='inputField' type='file' name='profileImage' onChange={handleImage} />
                        {preview && <img src={preview} alt='' />}
                    </div>
                    <div className='col loginField'>
                        <input className='inputField' type='text' name='name' placeholder='name' onChange={(e) => setIsName(e.target.value)} value={isName} />
                    </div>
                    <div classname='col loginField'>
                        <input className='inputField' type='text' name='about' placeholder='about' onChange={(e) => setAbout(e.target.value)} value={about} />
                    </div>
                    <div classname='col loginField'>
                        <input className='inputField' type="date" name='date' placeholder='start date' onChange={(e) => setStarted(e.target.value)} value={started} />
                    </div>
                    <div className='col loginField'>
                        <input className='inputField' type='text' name='certification' placeholder='certifications' onChange={(e) => setCertification(e.target.value)} value={certification} />
                    </div>
                    <div className='col loginField'>
                        <input className='inputField' type='url' name='facebook' placeholder='facebook url' onChange={(e) => setFacebook(e.target.value)} value={facebook} />
                    </div>
                    <div className='col loginField'>
                        <input className='inputField' type='url' name='twitter' placeholder='twitter url' onChange={(e) => setTwitter(e.target.value)} value={twitter} />
                    </div>
                    <div className='col loginField'>
                        <input className='inputField' type='url' name='instagram' placeholder='instagram url' onChange={(e) => setInstagram(e.target.value)} value={instagram} />
                    </div>
                    <div className='col loginField'>
                        <input className='inputField' type='url' name='website' placeholder='website url' onChange={(e) => setWebsite(e.target.value)} value={website} />
                    </div>
                    <div className='col loginField'>
                        <a target='blank' href='https://auth.calendly.com/oauth/authorize?client_id=UTvsFK4siqWhllb81txrCJ7kdqyA9ayq6Jr10QUmZec&response_type=code&redirect_uri=http://localhost:3000/'>Link Calandly Account</a>
                    </div>
                    <div classname='col loginField'>
                        <input className='inputField' type='text' name='services' placeholder='services/pricing' onChange={(e) => setServices(e.target.value)} value={services} />
                    </div>
                    <div classname='col loginField'>
                        <input className='inputField' type='text' name='why' placeholder='why you' onChange={(e) => setWhy(e.target.value)} value={why} />
                    </div>
                    <button className='loginRegisterButton create' type='submit'>Save Profile</button>
                </form>
            </div>
            <div>
                <p>Instasdfasflsadjf;lskajf;alskjf;lsdkjf;lsdakfj;alsdkfj;sladkfjasd;lkfjasdl;kf</p>
            </div>
        </>
    )
}

export default CreateProfile


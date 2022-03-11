import { useState }from 'react';
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";

function CreateProfile() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg] = useOutletContext();
    const [addImage, setAddImage] = useState(null);
    const [isName, setIsName] = useState('');
    const [about, setAbout] = useState('');
    const [started, setStarted] = useState('');
    const [certification, setCertification] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [website, setWebsite] = useState('');
    const [services, setServices] = useState('');
    const [why, setWhy] = useState('');

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
        setCertification('');
        setCreateDoula(false);
        setIsDoula(true);
        navigate('/calendly')
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
                    <div className='col loginField'>
                        <input className='inputField' type='text' name='about' placeholder='about' onChange={(e) => setAbout(e.target.value)} value={about} />
                    </div>
                    <div className='col loginField'>
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
                        <input className='inputField' type='text' name='services' placeholder='services/pricing' onChange={(e) => setServices(e.target.value)} value={services} />
                    </div>
                    <div className='col loginField'>
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


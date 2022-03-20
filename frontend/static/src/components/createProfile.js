import { useState } from 'react';
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'
import Form from 'react-bootstrap/Form'

function CreateProfile() {
    // const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, , isSuperUser, setIsSuperUser] = useOutletContext();
    const { navigate, setCreateDoula, setIsDoula, preview, setPreview } = useOutletContext();
    const [addImage, setAddImage] = useState(new File([], ''));
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
    const [city, setCity] = useState('')
    const [cityState, setCityState] = useState('')
    const [range, setRange] = useState(0)

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
        formData.append('city', city);
        formData.append('service_range', range);
        formData.append('state', cityState);

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        fetch(`${base_URL}/api/v1/accounts/doula/`, options);
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
        setCity('')
        setCityState('')
        setRange(0)
        setCreateDoula(false);
        setIsDoula(true);
        navigate('/calendly')
    }

    return (
        <>
            <div className='loginPlacholder'>
                <h2 className='createHead'>Your Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className='col loginField'>
                        <input className='inputField' type='file' name='profileImage' onChange={handleImage} />
                        <div className=' imgHolder'>
                            {preview && <img src={preview} alt='' className="image" />}
                        </div>
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='name' >Name</label>
                        <input className='inputField' type='text' name='name' placeholder='name' onChange={(e) => setIsName(e.target.value)} value={isName} required />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='started' >City</label>
                        <input className='inputField' type='text' name='city' placeholder='city' onChange={(e) => setCity(e.target.value)} value={city} required />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='started' >State</label>
                        <Form.Select id='stateForm' aria-label="Default select example" onChange={(e) => setCityState(e.target.value)} size="sm" required>
                            <option value="--">--</option>
                            <option value="AK">AK</option>
                            <option value="AL">AL</option>
                            <option value="AR">AR</option>
                            <option value="AZ">AZ</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DC">DC</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="IA">IA</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="MA">MA</option>
                            <option value="MD">MD</option>
                            <option value="ME">ME</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MO">MO</option>
                            <option value="MS">MS</option>
                            <option value="MT">MT</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="NE">NE</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NV">NV</option>
                            <option value="NY">NY</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VA">VA</option>
                            <option value="VT">VT</option>
                            <option value="WA">WA</option>
                            <option value="WI">WI</option>
                            <option value="WV">WV</option>
                            <option value="WY">WY</option>
                        </Form.Select>
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='serviceRange'>Service Range(miles)</label>
                        <input className='inputField' type='number' name='serviceRange' placeholder='service range' onChange={(e) => setRange(e.target.value)} value={range} required />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='about'>About Me</label>
                        <input className='inputField' type='text' name='about' placeholder='about' onChange={(e) => setAbout(e.target.value)} value={about} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='started'>Started</label>
                        <input className='inputField' type="date" name='date' placeholder='start date' onChange={(e) => setStarted(e.target.value)} value={started} required />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='certification'>Certifications</label>
                        <input className='inputField' type='text' name='certification' placeholder='certifications' onChange={(e) => setCertification(e.target.value)} value={certification} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='facebook'>Facebook</label>
                        <input className='inputField' type='url' name='facebook' placeholder='facebook url' onChange={(e) => setFacebook(e.target.value)} value={facebook} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='twitter'>Twitter</label>
                        <input className='inputField' type='url' name='twitter' placeholder='twitter url' onChange={(e) => setTwitter(e.target.value)} value={twitter} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='instagram'>Instagram</label>
                        <input className='inputField' type='url' name='instagram' placeholder='instagram url' onChange={(e) => setInstagram(e.target.value)} value={instagram} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='website'>Personal Website</label>
                        <input className='inputField' type='url' name='website' placeholder='website url' onChange={(e) => setWebsite(e.target.value)} value={website} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='services'>My Services</label>
                        <input className='inputField' type='text' name='services' placeholder='services/pricing' onChange={(e) => setServices(e.target.value)} value={services} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='why'>Why Me</label>
                        <input className='inputField' type='text' name='why' placeholder='why you' onChange={(e) => setWhy(e.target.value)} value={why} />
                    </div>
                    <div className='col loginField'>
                        <button className='loginRegisterButton' type='submit'>Save Profile</button>
                    </div>
                </form>
            </div>
            <div className='pageSupport'>
                <p>“We have a secret in our culture, and it's not that birth is painful. It's that women are strong.” - Laura Stavoe Harm</p>
            </div>
        </>
    )
}

export default CreateProfile


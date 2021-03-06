import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import { base_URL } from '../config/settings'
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, } from '@fortawesome/free-brands-svg-icons'
import { faComputer } from '@fortawesome/free-solid-svg-icons'

function ProfileCrud({ name, about, services, why, website, image, facebook, twitter, instagram, isEditing, certification, started, setIsEditing, handleImage, editProfile, setNewCertification, setNewFacebook, setNewInstagram, setNewTwitter, setNewWebsite, setNewAbout, setNewIsName, setNewServices, setNewWhy, setNewStarted, newFacebook, newInstagram, newTwitter, newWebsite, newIsName, newAbout, newWhy, newServices, newStarted, newCertification, id, calendly, linked, setLinked, addImage, updateImage, removeImage, service_range, city, state, newCity, setNewCity, newRange, setNewRange, setNewCityState, isDisplay, setIsDisplay, display_calendly, setProfile, profile }) {
    const { preview, setPreview, profileImg, handleError } = useOutletContext();
    const [isImage, setIsImage] = useState(false)
    const [iconFaceBook, setIconFacebook] = useState(false)
    const [iconInstagram, setIconInstagram] = useState(false)
    const [iconTwitter, setIconTwitter] = useState(false)
    const [iconWeb, setIconWeb] = useState(false)

    useEffect(() => {
        const checkSocialStatus = async () => {
            if (facebook === '') {
                setIconFacebook(true)
            }

            if (instagram === '') {
                setIconInstagram(true)
            }

            if (twitter === '') {
                setIconTwitter(true)
            }

            if (website === '') {
                setIconWeb(true)
            }
        }
        checkSocialStatus();
    }, []);

    const displayStatus = async (id) => {

        let status = ''

        if (display_calendly === true) {
            status = false
        } else if (display_calendly === false) {
            status = true
        }

        const calendlyStatus = {
            display_calendly: status,
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(calendlyStatus)
        }

        const response = await fetch(`${base_URL}/api/v1/accounts/${id}/doula/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();

        console.log(data)

        if (data.display_calendly === true) {
            setIsDisplay(true)
        } else if (data.display_calendly === false) {
            setIsDisplay(false)
        }

        const updateStatus = profile.map((status) => {
            if (status.id === id) {
                return data
            }
        })

        setProfile(updateStatus);
    }

    const edit = (e) => {
        e.preventDefault();
        editProfile(id);
        setIsEditing(false);

        e.target.reset();
    }

    const update = (e) => {
        e.preventDefault()
        updateImage(id)
        setIsImage(false)
        e.target.reset();
    }

    const remove = (e) => {
        e.preventDefault()
        removeImage(id)
        setIsImage(false)
    }

    const cancel = () => {
        setIsEditing(false);
    }

    const keep = () => {
        setIsImage(false)
        setPreview(profileImg)
    }

    const addCalendly = (
        <a target='blank' href='https://auth.calendly.com/oauth/authorize?client_id=UTvsFK4siqWhllb81txrCJ7kdqyA9ayq6Jr10QUmZec&response_type=code&redirect_uri=http://localhost:3000/'>Link Calendly Account</a>
    )

    const updateCalendly = (
        <div className='col loginField'>
            <p>Calendly: {calendly}</p>
        </div>
    )

    const imageMode = (
        <>
            <div className="crud">
                <div className='editImage'>
                    <img src={image} alt={name} className='image' />
                </div>
                <button className='loginRegisterButton' onClick={() => setIsImage(true)}>Edit/Remove</button>
            </div>
        </>
    )

    const changeImageMode = (
        <>
            <div className="changeImage">
                <form onSubmit={update}>
                    <div className='col loginField'>
                        <input className='inputField' type='file' name='profileImage' onChange={handleImage} />
                        <div className=' imgHolder'>
                            {preview && <img src={preview} alt='' className="image" />}
                        </div>
                        <button className='loginRegisterButton cancel' onClick={() => keep()}>Cancel</button>
                        <button className='loginRegisterButton' type='submit'>Save Profile</button>
                    </div>
                </form>
            </div>
            <button className='loginRegisterButton' type='button' onClick={remove}>Remove</button>

        </>
    )

    const noContactChoice = (
        <div></div>
    )

    const contactChoice = (
        <>
            <label htmlFor='checkbox'>Display Calendly {isDisplay}</label>
            <input className='doulaCheck' type='checkbox' onChange={() => displayStatus(id)} checked={isDisplay} />
        </>
    )

    const displayMode = (
        <section className='col article'>
            <div className="intro">
                <h2>{name}</h2>
                <label htmlFor='started' className="label">Started</label>
                <p>{started}</p>
                <label htmlFor='started' className="label">City</label>
                <p>{city}</p>
                <label htmlFor='started' className="label">State</label>
                <p>{state}</p>
                <label htmlFor='range' className="label">Service Range</label>
                <p>{service_range}</p>
            </div>
            <div className='socials row'>
                <h3>My Socials</h3>
                <div className='col-1'>
                    <a style={iconFaceBook ? { display: 'none' } : { display: 'unset' }} target='blank' href={facebook}><FontAwesomeIcon icon={faFacebookSquare} className='icon'></FontAwesomeIcon></a>
                </div>
                <div className='col-1'>
                    <a style={iconTwitter ? { display: 'none' } : { display: 'unset' }} target='blank' href={twitter}><FontAwesomeIcon icon={faTwitterSquare} className='icon'></FontAwesomeIcon></a>
                </div>
                <div className='col-1'>
                    <a style={iconInstagram ? { display: 'none' } : { display: 'unset' }} target='blank' href={instagram}><FontAwesomeIcon icon={faInstagramSquare} className='icon'></FontAwesomeIcon></a>
                </div>
                <div className='col-1'>
                    <a style={iconWeb ? { display: 'none' } : { display: 'unset' }} target='blank' href={website}><FontAwesomeIcon icon={faComputer} className='icon'></FontAwesomeIcon></a>
                </div>
            </div>
            <hr />
            <label htmlFor='certification' className='label'>Certifications</label>
            <p>{certification}</p>
            <label htmlFor='about' className='label'>About Me</label>
            <p className='summary'>{about}</p>
            <label htmlFor='services' className='label'>My Services</label>
            <p className='summary'>{services}</p>
            <label htmlFor='why' className='label'>Why Me</label>
            <p className='summary'>{why}</p>
            <p>{calendly}</p>
            <div className='col doulacheckPlacholder'>
                {linked ? contactChoice : noContactChoice}
            </div>
            <button className='loginRegisterButton' onClick={() => setIsEditing(true)}>Edit Profile</button>
        </section>
    )

    const editMode = (
        <>
            <div className='formPlacholder'>
                <form onSubmit={edit}>
                    <div className='col formField'>
                        <label htmlFor='name' className='inputLabel'>Name</label>
                        <input className='inputLabel' type='text' name='name' placeholder='name' onChange={(e) => setNewIsName(e.target.value)} value={newIsName} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='city' className='inputLabel'>City</label>
                        <input className='inputLabel' type='text' name='city' placeholder='city' onChange={(e) => setNewCity(e.target.value)} value={newCity} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='state' className='inputLabel'>State</label>
                        <Form.Select id='stateForm' aria-label="Default select example" onChange={(e) => setNewCityState(e.target.value)} size="sm">
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
                    <div className='col formField'>
                        <label htmlFor='serviceRange' className='inputLabel'>Service Range(miles)</label>
                        <input className='inputLabel' type='number' name='serviceRange' placeholder='service range' onChange={(e) => setNewRange(e.target.value)} value={newRange} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='about' className='inputLabel'>About Me</label>
                        <textarea className='inputLabel' type='text' name='about' placeholder='about' onChange={(e) => setNewAbout(e.target.value)} value={newAbout} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='started' className='inputLabel'>Started</label>
                        <input className='inputLabel' type="date" name='date' placeholder='start date' onChange={(e) => setNewStarted(e.target.value)} value={newStarted} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='certification' className='inputLabel'>Certifications</label>
                        <input className='inputLabel' type='text' name='certification' placeholder='certifications' onChange={(e) => setNewCertification(e.target.value)} value={newCertification} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='facebook' className='inputLabel'>Facebook</label>
                        <input className='inputLabel' type='url' name='facebook' placeholder='facebook url' onChange={(e) => setNewFacebook(e.target.value)} value={newFacebook} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='twitter' className='inputLabel'>Twitter</label>
                        <input className='inputLabel' type='url' name='twitter' placeholder='twitter url' onChange={(e) => setNewTwitter(e.target.value)} value={newTwitter} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='instagram' className='inputLabel'>Instagram</label>
                        <input className='inputLabel' type='url' name='instagram' placeholder='instagram url' onChange={(e) => setNewInstagram(e.target.value)} value={newInstagram} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='website' className='inputLabel'>Personal Website</label>
                        <input className='inputLabel' type='url' name='website' placeholder='website url' onChange={(e) => setNewWebsite(e.target.value)} value={newWebsite} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='calendly' className='inputLabel'>Calandly Link</label>
                        {linked ? updateCalendly : addCalendly}
                    </div>
                    <div className='col formField'>
                        <label htmlFor='services' className='inputLabel'>My Services</label>
                        <textarea className='inputLabel' type='text' name='services' placeholder='services/pricing' onChange={(e) => setNewServices(e.target.value)} value={newServices} />
                    </div>
                    <div className='col formField'>
                        <label htmlFor='why' className='inputLabel'>Why Me</label>
                        <textarea className='inputLabel' type='text' name='why' placeholder='why you' onChange={(e) => setNewWhy(e.target.value)} value={newWhy} />
                    </div>
                    <div className='col loginField'>
                        <button className='loginRegisterButton cancel' onClick={() => cancel()}>Cancel</button>
                        <button className='loginRegisterButton' type='submit'>Save Profile</button>
                    </div>
                </form>
            </div>
        </>
    )

    return (
        <div>
            {isImage ? changeImageMode : imageMode}
            {isEditing ? editMode : displayMode}
        </div>
    )
}

export default ProfileCrud
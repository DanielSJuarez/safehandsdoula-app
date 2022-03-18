import { useOutletContext } from "react-router-dom";
import { useState } from 'react';
import Form from 'react-bootstrap/Form'

function ProfileCrud({ name, about, services, why, website, image, facebook, twitter, instagram, isEditing, certification, started, setIsEditing, handleImage, editProfile, setNewCertification, setNewFacebook, setNewInstagram, setNewTwitter, setNewWebsite, setNewAbout, setNewIsName, setNewServices, setNewWhy, setNewStarted, newFacebook, newInstagram, newTwitter, newWebsite, newIsName, newAbout, newWhy, newServices, newStarted, newCertification, id, calendly, linked, setLinked, addImage, updateImage, removeImage , service_range, city, state, newCity, setNewCity, newRange, setNewRange, setNewCityState}) {
    // const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
    const {preview, setPreview, profileImg} = useOutletContext();
    const [isImage, setIsImage] = useState(false)

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
            {/* <input className='inputField' type='text' name='calendly' placeholder='calendly' value={calendly} /> */}
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
                    <button className='loginRegisterButton' onClick={() => keep()}>Cancel</button>
                    <button className='loginRegisterButton' type='submit'>Save Profile</button>
                </div>
            </form>
            </div>
            <button className='loginRegisterButton' type='button' onClick={remove}>Remove</button>
           
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
                <label htmlFor='socials' className="label">My Social's</label>
                <div className='col-3'>
                    <label htmlFor='facebook'>Facebook</label>
                    <a target='blank' href={facebook}>{facebook}</a>
                </div>
                <div className='col-3'>
                    <label htmlFor='twitter'>Twitter</label>
                    <a target='blank' href={twitter}>{twitter}</a>
                </div>
                <div className='col-3'>
                    <label htmlFor='instagran'>Instagram</label>
                    <a target='blank' href={instagram}>{instagram}</a>
                </div>
                <div className='col-3'>
                    <label htmlFor='website'>Personal Website</label>
                    <a target='blank' href={website}>{website}</a>
                </div>
            </div>
            <hr />
            {/* <label htmlFor='facebook' className='label'>Facebook</label>
            <a target='blank' href={facebook}>{facebook}</a>
            <label htmlFor='twitter' className='label'>Twitter</label>
            <a target='blank' href={twitter}>{twitter}</a>
            <label htmlFor='instagran' className='label'>Instagram</label>
            <a target='blank' href={instagram}>{instagram}</a>
            <label htmlFor='website' className='label'>Personal Website</label>
            <a target='blank' href={website}>{website}</a>
            <hr/> */}
            <label htmlFor='certification' className='label'>Certifications</label>
            <p>{certification}</p>
            <label htmlFor='about' className='label'>About Me</label>
            <p className='summary'>{about}</p>
            <label htmlFor='services' className='label'>My Services</label>
            <p className='summary'>{services}</p>
            <label htmlFor='why' className='label'>Why Me</label>
            <p className='summary'>{why}</p>
            <p>{calendly}</p>
            {/* <CalendlyWidget calendly={calendly}/> */}
            {/* <InlineWidget url={calendly} /> */}
            <button className='loginRegisterButton' onClick={() => setIsEditing(true)}>Edit Profile</button>
        </section>
    )
    // console.log(linked)

    const editMode = (
        <>
            <div className='loginPlacholder'>
                <form onSubmit={edit}>
                    <div className='col loginField'>
                        <label htmlFor='name'>Name</label>
                        <input className='inputField' type='text' name='name' placeholder='name' onChange={(e) => setNewIsName(e.target.value)} value={newIsName} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='city'>City</label>
                        <input className='inputField' type='text' name='city' placeholder='city' onChange={(e) => setNewCity(e.target.value)} value={newCity}/>
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='state'>State</label>
                        <Form.Select aria-label="Default select example" onChange={(e) => setNewCityState(e.target.value)} size="sm">
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
                        <input className='inputField' type='number' name='serviceRange' placeholder='service range' onChange={(e) => setNewRange(e.target.value)} value={newRange}/>
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='about'>About Me</label>
                        <input className='inputField' type='text' name='about' placeholder='about' onChange={(e) => setNewAbout(e.target.value)} value={newAbout} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='started'>Started</label>
                        <input className='inputField' type="date" name='date' placeholder='start date' onChange={(e) => setNewStarted(e.target.value)} value={newStarted} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='certification'>Certifications</label>
                        <input className='inputField' type='text' name='certification' placeholder='certifications' onChange={(e) => setNewCertification(e.target.value)} value={newCertification} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='facebook'>Facebook</label>
                        <input className='inputField' type='url' name='facebook' placeholder='facebook url' onChange={(e) => setNewFacebook(e.target.value)} value={newFacebook} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='twitter'>Twitter</label>
                        <input className='inputField' type='url' name='twitter' placeholder='twitter url' onChange={(e) => setNewTwitter(e.target.value)} value={newTwitter} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='instagram'>Instagram</label>
                        <input className='inputField' type='url' name='instagram' placeholder='instagram url' onChange={(e) => setNewInstagram(e.target.value)} value={newInstagram} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='website'>Personal Website</label>
                        <input className='inputField' type='url' name='website' placeholder='website url' onChange={(e) => setNewWebsite(e.target.value)} value={newWebsite} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='calendly'>Calandly Link</label>
                        {linked ? updateCalendly : addCalendly}
                        {/* <a target='blank' href='https://auth.calendly.com/oauth/authorize?client_id=JSdPVXJHqifv4b4gG72AIbwFffPxzlLG2D1RcfAJoIg&response_type=code&redirect_uri=https://safehandsdoula.com'>Link Calandly Account</a> */}
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='services'>My Services</label>
                        <input className='inputField' type='text' name='services' placeholder='services/pricing' onChange={(e) => setNewServices(e.target.value)} value={newServices} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='why'>Why Me</label>
                        <input className='inputField' type='text' name='why' placeholder='why you' onChange={(e) => setNewWhy(e.target.value)} value={newWhy} />
                    </div>
                    <div className='col loginField'>
                        <button className='loginRegisterButton' onClick={() => cancel()}>Cancel</button>
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
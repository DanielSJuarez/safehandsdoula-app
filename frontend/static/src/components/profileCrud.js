import { useOutletContext } from "react-router-dom";
import { useState } from 'react';

function ProfileCrud({ name, about, services, why, website, image, facebook, twitter, instagram, isEditing, certification, started, setIsEditing, handleImage, editProfile, setNewCertification, setNewFacebook, setNewInstagram, setNewTwitter, setNewWebsite, setNewAbout, setNewIsName, setNewServices, setNewWhy, setNewStarted, newFacebook, newInstagram, newTwitter, newWebsite, newIsName, newAbout, newWhy, newServices, newStarted, newCertification, id, calendly, linked, setLinked, addImage, updateImage, removeImage }) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary] = useOutletContext();
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
        setLinked(false);
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
            <div>
                <div className=' imgHolder'>
                    <img src={image} alt={name} className='image' />
                </div>
                <button className='loginRegisterButton' onClick={() => setIsImage(true)}>Edit/Remove</button>
            </div>
        </>
    )

    const changeImageMode = (
        <>
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
            <button className='loginRegisterButton' type='button' onClick={remove}>Remove</button>
        </>
    )

    const displayMode = (
        <section className='col article'>
            <h2>{name}</h2>
            <p>{started}</p>
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
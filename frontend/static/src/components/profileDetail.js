import Cookies, { attributes } from 'js-cookie';

function ProfileDetail({ name, about, services, why, website, image, facebook, twitter, instagram, isEditing, certification, started, setIsEditing, handleImage, editProfile, preview, setNewCertification, setNewFacebook, setNewInstagram, setNewTwitter, setNewWebsite, setNewAbout, setNewIsName, setNewServices, setNewWhy, setNewStarted, newFacebook, newInstagram, newTwitter, newWebsite, newIsName, newAbout, newWhy, newServices, newStarted, newCertification , id, setPreview, setAddImage, calendly, linked, setLinked}) {
    const edit = (e) => {
        e.preventDefault(); 
        editProfile(id)
        setIsEditing(false)
        e.target.reset();
    }

    const handleError = (err) => {
        console.log(err);
    }

    const removeImage = async (id) =>{
        const formData = new FormData();
        formData.append('image', new File([], ''));

        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch(`/api/v1/accounts/${id}/doula/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }      
        const data = await response.json();
        console.log(data.image)
        // setAddImage(data.image)
        setPreview(data.image)
    }

    const cancel = () => {
        setIsEditing(false);
        setLinked(false);
    }

    const addCalendly = (
        <a target='blank' href='https://auth.calendly.com/oauth/authorize?client_id=UTvsFK4siqWhllb81txrCJ7kdqyA9ayq6Jr10QUmZec&response_type=code&redirect_uri=http://localhost:3000/'>Link Calendly Account</a>
    )

    const updateCalendly = (
        <div className='col loginField'>
            <input className='inputField' type='text' name='calendly' placeholder='calendly'  value={calendly}/>
        </div>
    )

    const displayMode = (
        <section className='col article'>
            <div className='imgHolder'>
                <img src={image} alt={name} />
            </div>
            <h2>{name}</h2>
            <p>{started}</p>
            <a target='blank' href={facebook}>{facebook}</a>
            <a target='blank' href={twitter}>{twitter}</a>
            <a target='blank' href={instagram}>{instagram}</a>
            <a target='blank' href={website}>{website}</a>
            <p>{certification}</p>
            <p className='summary'>{about}</p>
            <p className='summary'>{services}</p>
            <p className='summary'>{why}</p>
            <p>{calendly}</p>
            {/* <CalendlyWidget calendly={calendly}/> */}
            {/* <InlineWidget url={calendly} /> */}
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </section>
    )
    // console.log(linked)

    const editMode = (
            <>
            <form onSubmit={edit}>
                <div className='col loginField'>
                    <input className='inputField' type='file' name='profileImage' onChange={handleImage} />
                    {preview && <img src={preview} alt='' />}
                </div>
                <button type='button' onClick={() => removeImage(id)}>Remove Image</button>
                <div className='col loginField'>
                    <input className='inputField' type='text' name='name' placeholder='name' onChange={(e)=> setNewIsName(e.target.value)} value={newIsName}/>
                </div>
                <div className='col loginField'>
                    <input className='inputField' type='text' name='about' placeholder='about' onChange={(e)=> setNewAbout(e.target.value)} value={newAbout}/>
                </div>
                <div className='col loginField'>
                    <input className='inputField' type="date" name='date' placeholder='start date' onChange={(e)=> setNewStarted(e.target.value)} value={newStarted}/>
                </div>
                <div className='col loginField'>
                    <input className='inputField' type='text' name='certification' placeholder='certifications' onChange={(e)=> setNewCertification(e.target.value)} value={newCertification}/>
                </div>
                <div className='col loginField'>
                    <input className='inputField' type='url' name='facebook' placeholder='facebook url' onChange={(e)=> setNewFacebook(e.target.value)} value={newFacebook}/>
                </div>
                <div className='col loginField'>
                    <input className='inputField' type='url' name='twitter' placeholder='twitter url' onChange={(e)=> setNewTwitter(e.target.value)} value={newTwitter}/>
                </div>
                <div className='col loginField'>
                    <input className='inputField' type='url' name='instagram' placeholder='instagram url' onChange={(e)=> setNewInstagram(e.target.value)} value={newInstagram}/>
                </div>
                <div className='col loginField'>
                    <input className='inputField' type='url' name='website' placeholder='website url' onChange={(e)=> setNewWebsite(e.target.value)} value={newWebsite}/>
                </div>
                <div className='col loginField'>
                    {linked ? updateCalendly : addCalendly}
                    {/* <a target='blank' href='https://auth.calendly.com/oauth/authorize?client_id=JSdPVXJHqifv4b4gG72AIbwFffPxzlLG2D1RcfAJoIg&response_type=code&redirect_uri=https://safehandsdoula.com'>Link Calandly Account</a> */}
                </div>
                <div className='col loginField'>
                    <input className='inputField' type='text' name='services' placeholder='services/pricing' onChange={(e)=> setNewServices(e.target.value)} value={newServices}/>
                </div>
                <div className='col loginField'>
                    <input className='inputField' type='text' name='why' placeholder='why you' onChange={(e)=> setNewWhy(e.target.value)} value={newWhy}/>
                </div>
                <button onClick={() => cancel()}>Cancel</button>
                <button className='loginRegisterButton create' type='submit'>Save Profile</button>
            </form>
            </>
    )

    return (
        <div>
            {isEditing ? editMode : displayMode}
        </div>
    )
}

export default ProfileDetail
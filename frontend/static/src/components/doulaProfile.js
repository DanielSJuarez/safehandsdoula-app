import { useState, useEffect } from 'react'
import ProfileDetail from './profileDetail';
import Cookies from 'js-cookie';

function DoulaProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState(null)
    const [addImage, setAddImage] = useState(null);
    const [newIsName, setNewIsName] = useState('');
    const [newAbout, setNewAbout] = useState('');
    const [newStarted, setNewStarted] = useState('');
    const [preview, setPreview] = useState('');
    const [newCertification, setNewCertification] = useState('')
    const [newFacebook, setNewFacebook] = useState('')
    const [newTwitter, setNewTwitter] = useState('')
    const [newInstagram, setNewInstagram] = useState('')
    const [newWebsite, setNewWebsite] = useState('')
    const [newServices, setNewServices] = useState('')
    const [newWhy, setNewWhy] = useState('')
    const [linked, setLinked] = useState(false)

    const handleError = (err) => {
        console.log(err);
    }

    const handleImage = e => {

        const file = e.target.files[0];
        setAddImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(file);
    }

    const editProfile = async (id) => {

        const updatedprofile = {
            name: newIsName,
            about: newAbout,
            started: newStarted,
            image: addImage,
            services: newServices,
            why: newWhy,
            website: newWebsite,
            facebook: newFacebook,
            twitter: newTwitter,
            instagram: newInstagram,
            certification: newCertification,
        }

        const formData = new FormData();
        for (const [key, value] of Object.entries(updatedprofile)) {
                formData.append(key, value)
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
           
        const data = await response.json();

        const updateProfile = profile.map((profile) => {
            if (profile.id === id) {
                return data
            }
        })
        setProfile(updateProfile)
        // setPreview('');
        // setAddImage('');
        // setNewIsName('');
        // setNewAbout('');
        // setNewStarted('');
        // setNewServices('');
        // setNewWhy('');
        // setNewWebsite('');
        // setNewFacebook('');
        // setNewTwitter('');
        // setNewInstagram('');
        // setNewCertification('')
        setLinked(false)
    }

    useEffect(() => {
        const getProfile = async () => {
            const response = await fetch('/api/v1/accounts/doula/').catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setProfile(data);
                // console.log(data[0].calendly)
                setNewIsName(data[0].name);
                setNewAbout(data[0].about);
                setNewStarted(data[0].started);
                setNewServices(data[0].services);
                setNewWhy(data[0].why);
                setNewWebsite(data[0].website);
                setNewFacebook(data[0].facebook);
                setNewTwitter(data[0].twitter);
                setNewInstagram(data[0].instagram);
                setNewCertification(data[0].certification);
                setPreview(data[0].image)
                setAddImage(data[0].image)
                
                if (data[0].calendly === !''){
                    console.log('yes')
                    setLinked(true) 
                }
            }
        }
        getProfile();
    }, []);

    if (!profile) {
        return <div>Fetching profile data....</div>
    }

    const profileDetail = profile.map((profile) => (
        <ProfileDetail key={profile.id} {...profile} isEditing={isEditing} setIsEditing={setIsEditing} handleImage={handleImage} editProfile={editProfile} preview={preview} setNewAbout={setNewAbout} setNewCertification={setNewCertification} setNewFacebook={setNewFacebook} setNewInstagram={setNewInstagram} setNewTwitter={setNewTwitter} setNewWebsite={setNewWebsite} setNewIsName={setNewIsName} setNewServices={setNewServices} setNewWhy={setNewWhy} setNewStarted={setNewStarted} newFacebook={newFacebook} newInstagram={newInstagram} newTwitter={newTwitter} newWebsite={newWebsite} newIsName={newIsName} newAbout={newAbout} newStarted={newStarted} newCertification={newCertification} newServices={newServices} newWhy={newWhy}
        setAddImage={setAddImage} setPreview={setPreview} linked={linked} setLinked={setLinked}/>
    ))

    return (
        <>
        <div>feedback</div>
        <div>
            {profileDetail}
        </div>
        <div>Rating</div>
        </>
    )
}

export default DoulaProfile
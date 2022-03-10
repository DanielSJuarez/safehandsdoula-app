import { useState, useEffect } from 'react'
import ProfileCrud from './profileCrud';
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";

function ProfileDetail() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg] = useOutletContext();
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState(null);
    const [addImage, setAddImage] = useState('');
    const [newIsName, setNewIsName] = useState('');
    const [newAbout, setNewAbout] = useState('');
    const [newStarted, setNewStarted] = useState('');
    const [newCertification, setNewCertification] = useState('');
    const [newFacebook, setNewFacebook] = useState('');
    const [newTwitter, setNewTwitter] = useState('');
    const [newInstagram, setNewInstagram] = useState('');
    const [newWebsite, setNewWebsite] = useState('');
    const [newServices, setNewServices] = useState('');
    const [newWhy, setNewWhy] = useState('');
    const [linked, setLinked] = useState(false);
    // console.log(addImage)
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
            // image: addImage,
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
                console.log(data)
                return data
            }
        })
        setProfile(updateProfile)
        setLinked(false)
    }

    const updateImage = async (id) => {
        const formData = new FormData();
        formData.append('image', addImage);

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
        const updateProfile = profile.map((profile) => {
            if (profile.id === id) {
                return data
            }
        })
        setProfile(updateProfile)
        setPreview(data.image);
        setProfileImg(data.image)
    }

    const removeImage = async (id) => {
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
        const updateProfile = profile.map((profile) => {
            if (profile.id === id) {
                return data
            }
        })
        setProfile(updateProfile)
        setPreview(data.image);
        setProfileImg(data.image)
    }

    useEffect(() => {
        const getProfile = async () => {
            const response = await fetch('/api/v1/accounts/doula/').catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setProfile(data);
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
                // setAddImage(data[0].image)

                if (data[0].calendly === !'') {
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
        <ProfileCrud key={profile.id} {...profile} isEditing={isEditing} setIsEditing={setIsEditing} handleImage={handleImage} editProfile={editProfile} setNewAbout={setNewAbout} setNewCertification={setNewCertification} setNewFacebook={setNewFacebook} setNewInstagram={setNewInstagram} setNewTwitter={setNewTwitter} setNewWebsite={setNewWebsite} setNewIsName={setNewIsName} setNewServices={setNewServices} setNewWhy={setNewWhy} setNewStarted={setNewStarted} newFacebook={newFacebook} newInstagram={newInstagram} newTwitter={newTwitter} newWebsite={newWebsite} newIsName={newIsName} newAbout={newAbout} newStarted={newStarted} newCertification={newCertification} newServices={newServices} newWhy={newWhy}
            linked={linked} setLinked={setLinked} preview={preview} setPreview={setPreview} addImage={addImage} updateImage={updateImage} removeImage={removeImage}/>
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

export default ProfileDetail
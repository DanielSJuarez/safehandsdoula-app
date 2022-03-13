import { useState, useEffect } from 'react'
import ProfileCrud from './profileCrud';
import ContactDetail from './contactDetail'
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";

function ProfileDetail() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary] = useOutletContext();
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
    const [contacts, setContacts] = useState(null)
    const [pk, setPk] = useState('')
    const [status, setStatus] = useState(null)
    
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

    const getContacts = async (id) => {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        
        const response = await fetch(`/api/v1/doula/${id}/contacts/`).catch(handleError);

        if (!response.ok) {
            throw new Error('Netword response was not OK!')
        } else {
            const data = await response.json();
            setContacts(data);
        }
    }
   
    const accountStatus = async (pk) => {
        let isStatus = ''
        
        if (status === 'ACT') {
            isStatus = 'INA'
        } else if (status === 'INA') {
            isStatus = 'ACT'
        }

        const changeAccount = {
            is_active : isStatus,
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(changeAccount)
        }
        const response = await fetch(`/api/v1/accounts/${pk}/doula/`, options)
        
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();

        setStatus(data.is_active)
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
                getContacts(data[0].id);
                setPk(data[0].id)
                setStatus(data[0].is_active)
                setProfileImg(data[0].image)
            }
        }
        getProfile();
    }, []);

    if (!profile) {
        return <div>Fetching profile data....</div>
    }

    const profileDetail = profile.map((profile) => (
        <ProfileCrud key={profile.id} {...profile} isEditing={isEditing} setIsEditing={setIsEditing} handleImage={handleImage} editProfile={editProfile} setNewAbout={setNewAbout} setNewCertification={setNewCertification} setNewFacebook={setNewFacebook} setNewInstagram={setNewInstagram} setNewTwitter={setNewTwitter} setNewWebsite={setNewWebsite} setNewIsName={setNewIsName} setNewServices={setNewServices} setNewWhy={setNewWhy} setNewStarted={setNewStarted} newFacebook={newFacebook} newInstagram={newInstagram} newTwitter={newTwitter} newWebsite={newWebsite} newIsName={newIsName} newAbout={newAbout} newStarted={newStarted} newCertification={newCertification} newServices={newServices} newWhy={newWhy}
         preview={preview} setPreview={setPreview} addImage={addImage} updateImage={updateImage} removeImage={removeImage} />
    ))

    if (!contacts) {
        return <div>Fetching contact data....</div>
    }

    const contactNewFilter = contacts.filter(contact => (
        contact.contact_status === 'NEW'
    ))

    const contactNewList = contactNewFilter.map((contact) => (
        <ContactDetail key={contact.id} {...contact} setContacts={setContacts} contacts={contacts} pk={pk}/>
    ))

    const contactContactedFilter = contacts.filter(contact => (
        contact.contact_status === 'CON'
    ))

    const contactContactedList = contactContactedFilter.map((contact) => (
        <ContactDetail key={contact.id} {...contact} setContacts={setContacts} contacts={contacts} pk={pk}/>
    ))

    return (
        <>
            <p>Account Status: {status}</p>
            <button type='button' onClick={() => accountStatus(pk)}>Activate/Inactivate Account</button>
            <div className='row'>
            <div className=''>
                <p>New</p>
                {contactNewList}
                <p>Contacted</p>
                {contactContactedList}
            </div>
            <div>
                {profileDetail}
            </div>
            </div>
            <div>Rating</div>
        </>
    )
}

export default ProfileDetail
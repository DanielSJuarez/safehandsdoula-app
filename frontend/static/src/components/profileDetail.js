import { useState, useEffect } from 'react'
import ProfileCrud from './profileCrud';
import ContactDetail from './contactDetail'
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'


function ProfileDetail() {
    const { handleError, preview, setPreview, setProfileImg } = useOutletContext();
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
    const [activeButton, setActiveButton] = useState('')
    const [show, setShow] = useState(false);
    const [shown, setShown] = useState('')
    const [newRange, setNewRange] = useState(0);
    const [newCity, setNewCity] = useState('')
    const [newCityState, setNewCityState] = useState('')
    const [isDisplay, setIsDisplay] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleImage = e => {

        const file = e.target.files[0];
        setAddImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(file);
    }

    const editProfile = async (id, display) => {

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
            city: newCity,
            state: newCityState,
            service_range: newRange,
        }

        const formData = new FormData();
        for (const [key, value] of Object.entries(updatedprofile)) {
            if (value) {
                formData.append(key, value)
            }
        }

        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData
        }

        const response = await fetch(`${base_URL}/api/v1/accounts/${id}/doula/`, options).catch(handleError);

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

        const response = await fetch(`${base_URL}/api/v1/accounts/${id}/doula/`, options).catch(handleError);

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

        const response = await fetch(`${base_URL}/api/v1/accounts/${id}/doula/`, options).catch(handleError);

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

        const response = await fetch(`${base_URL}/api/v1/doula/${id}/contacts/`).catch(handleError);

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
            setActiveButton('Make Account Public')
            setShown('Public accounts will be shown on safehandadouls.com and will available for contact by site users.')
            setShow(false);
        } else if (status === 'INA') {
            isStatus = 'ACT'
            setActiveButton('Make Account Private')
            setShown('Private accounts will not be shown on safehandadouls.com and will not available for contact by site users.')
            setShow(false);
        }

        const changeAccount = {
            is_active: isStatus,
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(changeAccount)
        }
        const response = await fetch(`${base_URL}/api/v1/accounts/${pk}/doula/`, options)

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();

        setStatus(data.is_active)
    }



    useEffect(() => {
        const getProfile = async () => {

            const response = await fetch(`${base_URL}/api/v1/accounts/doula/`).catch(handleError);

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
                setNewCity(data[0].city)
                setNewCityState(data[0].state)
                setNewRange(data[0].service_range)
                setStatus(data[0].is_active)
                setProfileImg(data[0].image)
                setIsDisplay(data[0].display_calendly)
                if (data[0].is_active === 'ACT') {
                    setActiveButton('Make Account Private')
                    setShown('Private accounts will not be shown on safehandadouls.com and will not available for contact by site users.')
                } else {
                    setActiveButton('Make Account Public')
                    setShown('Public accounts will be shown on safehandadouls.com and will available for contact by site users.')
                }
            }
        }
        getProfile();
    }, []);

    if (!profile) {
        return <div>Fetching profile data...
            <Spinner animation="border" size="sm" />
        </div>
    }

    const profileDetail = profile.map((profileData) => (
        <ProfileCrud key={profileData.id} {...profileData} profile={profile} isEditing={isEditing} setIsEditing={setIsEditing} handleImage={handleImage} editProfile={editProfile} setNewAbout={setNewAbout} setNewCertification={setNewCertification} setNewFacebook={setNewFacebook} setNewInstagram={setNewInstagram} setNewTwitter={setNewTwitter} setNewWebsite={setNewWebsite} setNewIsName={setNewIsName} setNewServices={setNewServices} setNewWhy={setNewWhy} setNewStarted={setNewStarted} newFacebook={newFacebook} newInstagram={newInstagram} newTwitter={newTwitter} newWebsite={newWebsite} newIsName={newIsName} newAbout={newAbout} newStarted={newStarted} newCertification={newCertification} newServices={newServices} newWhy={newWhy}
            preview={preview} setPreview={setPreview} addImage={addImage} updateImage={updateImage} removeImage={removeImage} newRange={newRange} setNewRange={setNewRange} newCity={newCity} setNewCity={setNewCity} newCityState={newCityState} setNewCityState={setNewCityState} isDisplay={isDisplay} setIsDisplay={setIsDisplay} setProfile={setProfile} />
    ))

    if (!contacts) {
        return <div>Fetching contact data...
            <Spinner animation="border" size="sm" />
        </div>
    }

    const contactList = contacts.map((contact) => (
        <ContactDetail key={contact.id} {...contact} setContacts={setContacts} contacts={contacts} pk={pk}/>
    ))

    return (
        <>
            <div className='row mx-0'>
                <div className="col-md-12 col-lg-3 aat contactList">
                    <h2>Inbox</h2>
                    <p className='contactHead'>Messages</p>
                    {contactList}
                </div>
                <div className='col-md-12 col-lg-9'>
                    <h2>Profile</h2>
                    {profileDetail}
                </div>
            </div>
            <hr />
            <div className='account'>
                <p>Account Status: {status}</p>
                <button className='loginRegisterButton' type='button' onClick={handleShow}>{activeButton}</button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Account Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {shown}
                </Modal.Body>
                <Modal.Footer>
                    <button className='modalButton' onClick={handleClose}>
                        Close
                    </button>
                    <button className='modalButton' onClick={() => accountStatus(pk)}>Confirm</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProfileDetail
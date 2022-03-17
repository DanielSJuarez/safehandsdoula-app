import { useState } from "react"
import { useOutletContext } from "react-router-dom";
import Cookies from 'js-cookie';
import {environment} from '../config/settings'


function ContactDoula({id}) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary , isSuperUser, setIsSuperUser] = useOutletContext();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [info, setInfo] = useState('')

    const clear = () => {
        setName('')
        setEmail('')
        setPhone('')
        setInfo('')
    }

    const send = e => {
        e.preventDefault()
        submitContact(id)
    }

    const submitContact = (id) => {

        let location = ''
            if (environment === 'development'){
                location = 'http://localhost:8000'
            } else if (environment === 'production'){
                location = 'https://safehandsdoula-app-dsj.herokuapp.com'
            }

        const newContact = {
            name,
            phone_number: phone,
            email, 
            question: info,
            doula: id,
        }
    
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(newContact)
        }

        fetch(`/api/v1/doula/${id}/contact/`, options);
        setName('');
        setEmail('');
        setPhone('');
        setInfo('');
    }

    return (
        <div className='loginPlacholder'>
            <form  onSubmit={send}>
                <div className='col loginField'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' className='inputField' name='name' id='name' placeholder='name' onChange={(e) => setName(e.target.value)} required value={name} required/>
                </div>
                <div className='col loginField'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' className='inputField' name='email' id='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} required value={email} required/>
                </div>
                <div className='col loginField'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='text' className='inputField' name='phone' id='phone' placeholder='phone' onChange={(e) => setPhone(e.target.value)} required value={phone} required/>
                </div>
                <div className='col loginField'>
                    <label htmlFor='info'>Info</label>
                    <input type='text' className='inputField' name='info' id='info' placeholder='info' onChange={(e) => setInfo(e.target.value)} required value={info} required/>
                </div>
                <div className='col loginField'>
                    <button className='loginRegisterButton' type='button' onClick={() => clear()}>Clear</button>
                    <button className='loginRegisterButton' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ContactDoula
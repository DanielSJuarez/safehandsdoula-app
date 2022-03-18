import { useState, useRef } from "react"
import { useOutletContext } from "react-router-dom";
import Cookies from 'js-cookie';
import { base_URL } from '../config/settings'
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'


function ContactDoula({ id }) {
    // const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary , isSuperUser, setIsSuperUser] = useOutletContext();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [info, setInfo] = useState('')
    const [show, setShow] = useState(false);
    const target = useRef(null);

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

        fetch(`${base_URL}/api/v1/doula/${id}/contact/`, options);
        setName('');
        setEmail('');
        setPhone('');
        setInfo('');
        setShow(true)
    }

    return (
        <div className='loginPlacholder'>
            <form onSubmit={send}>
                <div className='col loginField'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' className='inputField' name='name' id='name' placeholder='name' onChange={(e) => setName(e.target.value)} required value={name} required />
                </div>
                <div className='col loginField'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' className='inputField' name='email' id='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} required value={email} required />
                </div>
                <div className='col loginField'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='text' className='inputField' name='phone' id='phone' placeholder='phone' onChange={(e) => setPhone(e.target.value)} required value={phone} required />
                </div>
                <div className='col loginField'>
                    <label htmlFor='info'>Info</label>
                    <input type='text' className='inputField' name='info' id='info' placeholder='info' onChange={(e) => setInfo(e.target.value)} required value={info} required />
                </div>
                <div className='col loginField'>
                    <button className='loginRegisterButton' type='button' onClick={() => clear()}>Clear</button>
                    {/* <button className='loginRegisterButton' type='submit'>Submit</button> */}
                    <button className='loginRegisterButton report' ref={target} onMouseLeave={() => setShow(false)}>Submit</button>
                    <Overlay target={target.current} show={show} placement="right">
                        {(props) => (
                            <Tooltip id="overlay-example" {...props}>
                                Your request has been successfully submitted
                            </Tooltip>
                        )}
                    </Overlay>
                </div>
            </form>
        </div>
    )
}

export default ContactDoula






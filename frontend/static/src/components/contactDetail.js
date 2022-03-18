import { useOutletContext } from "react-router-dom";
import { useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { base_URL } from '../config/settings'
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'

function ContactDetail({ name, email, question, phone_number, id, contact_status, pk, setContacts, contacts, isChecked, setIsChecked, read, setRead }) {
    // const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary , isSuperUser, setIsSuperUser] = useOutletContext();
    const { handleError } = useOutletContext();
    const [show, setShow] = useState(false);
    const [contactDisplay, setContactDisplay] = useState(false)
    const target = useRef(null);
  

    const changeStatus = (id) => {
        if (contactDisplay === false && isChecked === false) {
            contact(id)
        }
        setContactDisplay(true)  
    }
   
    // const newContact = async (id) => {

        // let contact = 'CON'

        // if (contact_status === 'NEW') {
        //     contact = 'CON'
        // }

        // const contactedStatus = {
        //     contact_status: 'CON',
        // }

        // const options = {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-type': 'application/json',
        //         'X-CSRFToken': Cookies.get('csrftoken'),
        //     },
        //     body: JSON.stringify(contactedStatus)
        // }

        // const response = await fetch(`${base_URL}/api/v1/doula/${pk}/contact/${id}/`, options);

        // if (!response.ok) {
        //     throw new Error('Network response was not OK');
        // }

        // const data = await response.json();

        // setIsChecked(true)
        // setRead('Mark as unread')

        // const updateContact = contacts.map((contact) => {
        //     if (contact.id === id) {
        //         setContactDisplay(true)  
        //         return data
        //     }
        // })
        // setContacts(updateContact)  
    // }

    const clickStatus = (
        <div className='col doulacheckPlacholder'>
            <button type='button' onClick={() => contact(id)}>Mark as Unread</button>
                {/* <label htmlFor='checkbox'>{read}</label>
                <input className='doulaCheck' type='checkbox' onChange={() => contact(id)} checked={isChecked} /> */}
            </div>
    )

    const noStatus = (
        <div></div>
    )

    const contact = async (id) => {

        let contact = ''

        if (contact_status === 'NEW') {
            contact = 'CON'
        } else if (contact_status === 'CON') {
            contact = 'NEW'
        }

        const contactedStatus = {
            contact_status: contact,
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(contactedStatus)
        }

        const response = await fetch(`${base_URL}/api/v1/doula/${pk}/contact/${id}/`, options);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();

        if (data.contact_status === 'CON') {
            setIsChecked(true)
            // setRead('Mark as unread')
        } else if (data.contact_status === 'NEW') {
            setIsChecked(false)
            // setRead('Mark as read')
        }

        const updateContact = contacts.map((contact) => {
            if (contact.id === id) {
                return data
            }
        })
        setContacts(updateContact)
    }

    const reportContact = async (id) => {

        const report = {
            reported: true,
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(report)
        }
        const response = await fetch(`${base_URL}/api/v1/doula/${pk}/contact/${id}/`, options).catch(handleError);
        setShow(true)
    }

    const contactHead = (
        <div className="contact" style={isChecked ? { background: '#dbb0a0', } : { background: '#eab586' }}>
            <div onClick={() => changeStatus(id)}>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{phone_number}</p>
            </div>
            {isChecked ? clickStatus : noStatus}
            {/* <div className='col doulacheckPlacholder'>
                <label htmlFor='checkbox'>{read}</label>
                <input className='doulaCheck' type='checkbox' onChange={() => contact(id)} checked={isChecked} />
            </div> */}
            <hr />
        </div>
    )

    const contactDetail = (
        <div className="contact" style={ isChecked ? { background: '#dbb0a0', } : { background: '#eab586' }}>
            <button type="button" onClick={() => setContactDisplay(false)}>Back</button>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{phone_number}</p>
            <p>{question}</p>
            <button className='loginRegisterButton report' ref={target} onMouseLeave={() => setShow(false)} onClick={() => reportContact(id)}>
                Report
            </button>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Reported
                    </Tooltip>
                )}
            </Overlay>
            <hr />
        </div>
    )

    return (
        // <div className="contact">
        //     <h3>{name}</h3>
        //     <p>{email}</p>
        //     <p>{phone_number}</p>
        //     <p>{question}</p>
        //     <div className='col doulacheckPlacholder'>
        //         <label htmlFor='checkbox'>{read}</label>
        //         <input className='doulaCheck' type='checkbox' onChange={() => contact(id)} checked={isChecked} />
        //     </div>
        //     <button className='loginRegisterButton report' ref={target} onMouseLeave={() => setShow(false)} onClick={() => reportContact(id)}>
        //         Report
        //     </button>
        //     <Overlay target={target.current} show={show} placement="right">
        //         {(props) => (
        //             <Tooltip id="overlay-example" {...props}>
        //                 Reported
        //             </Tooltip>
        //         )}
        //     </Overlay>
        //     <hr />
        // </div>
        <div>
            {contactDisplay ? contactDetail : contactHead}
        </div>
    )
}

export default ContactDetail
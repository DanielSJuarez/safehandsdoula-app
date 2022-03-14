import { useOutletContext } from "react-router-dom";
import { useState } from 'react';
import Cookies from 'js-cookie';

function ContactDetail({ name, email, question, phone_number, id, contact_status, pk, setContacts, contacts, isChecked, setIsChecked, read, setRead}) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary] = useOutletContext();
    console.log(isChecked)
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

        const response = await fetch(`/api/v1/doula/${pk}/contact/${id}/`, options);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();

        if (data.contact_status === 'CON') {
            setIsChecked(true)
            setRead('Mark as unread')
        } else if (data.contact_status === 'NEW') {
            setIsChecked(false)
            setRead('Mark as read')
        }

        const updateContact = contacts.map((contact) => {
            if (contact.id === id) {
                return data
            }
        })
        setContacts(updateContact)
    }

    return (
        <div className="contact">
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{phone_number}</p>
            <p>{question}</p>
            <div className='col doulacheckPlacholder'>
                <label htmlFor='checkbox'>{read}</label>
                <input className='doulaCheck' type='checkbox' onChange={() => contact(id)} checked={isChecked} />
            </div>
            <button className='loginRegisterButton report'>Report</button>
            {/* <button className='loginRegisterButton' type="button" onClick={() => contact(id)}>New/Contacted</button> */}
            <hr />
        </div>
    )
}

export default ContactDetail
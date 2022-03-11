import { useOutletContext } from "react-router-dom";
import { useState } from 'react';
import Cookies from 'js-cookie';

function ContactDetail({ name, email, question, phone_number, id, contact_status, pk, setContacts, contacts }) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg] = useOutletContext();
    
    const contact = async (id) => {
        let contact = ''

        if (contact_status === 'NEW') {
            contact = 'CON'
        } else if (contact_status === 'CON') {
            contact = 'NEW'
        }

        const contactedStatus = {
            contact_status : contact,
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

        const updateContact = contacts.map((contact) => {
            if (contact.id === id) {
                console.log(data)
                return data
            }
        })
        setContacts(updateContact)
    }

    return (
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{phone_number}</p>
            <p>{question}</p>
            <button type="button" onClick={() => contact(id)}>New/Contacted</button>
        </div>
    )
}

export default ContactDetail
import { useOutletContext } from "react-router-dom";
import { useState } from 'react';
import Cookies from 'js-cookie';
import {environment} from '../config/settings'

function ContactDetail({ name, email, question, phone_number, id, contact_status, pk, setContacts, contacts, isChecked, setIsChecked, read, setRead}) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary , isSuperUser, setIsSuperUser] = useOutletContext();
    console.log(isChecked)
    const contact = async (id) => {

        let location = ''
            if (environment === 'development'){
                location = 'http://localhost:8000'
            } else if (environment === 'production'){
                location = 'https://safehandsdoula-app-dsj.herokuapp.com'
            }
       
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

        const response = await fetch(`${location}/api/v1/doula/${pk}/contact/${id}/`, options);

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

    const reportContact = async (id) => {

        let location = ''
            if (environment === 'development'){
                location = 'http://localhost:8000'
            } else if (environment === 'production'){
                location = 'https://safehandsdoula-app-dsj.herokuapp.com'
            }

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
        const response = await fetch(`${location}/api/v1/doula/${pk}/contact/${id}/`, options).catch(handleError);
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
            <button className='loginRegisterButton report' onClick={() => reportContact(id)} >Report</button>
            <hr />
        </div>
    )
}

export default ContactDetail
import { useOutletContext } from "react-router-dom";
import { useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { base_URL } from '../config/settings'
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

function ContactDetail({ name, email, question, phone_number, id, pk, setContacts, contacts, read_status }) {
    const { handleError } = useOutletContext();
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState(false);
    const [contactDisplay, setContactDisplay] = useState(false)
    const target = useRef(null);
    const newTarget = useRef(null);


    const changeStatus = async (id) => {
        if (contactDisplay === false && read_status === false) {
            contact(id)
        }
        setContactDisplay(true)
    }

    const noStatus = (
        <div></div>
    )

    const contact = async (id) => {

        let contact = ''

        if (read_status === true) {
            contact = false
        } else if (read_status === false) {
            contact = true
        }

        const contactedStatus = {
            read_status: contact,
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

        const updateContact = contacts.map((contact) => {
            if (contact.id === id) {
                return data
            } else {
                return contact
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

    const clickStatus = (
        <div className='col doulacheckPlacholder'>
            <button className='modalButton' ref={newTarget} type='button' onMouseEnter={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)} onClick={() => contact(id)}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></button>
            <Overlay target={newTarget.current} show={display} placement="right">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Mark as Unread
                    </Tooltip>
                )}
            </Overlay>
        </div>
    )

    const contactHead = (
        <div className="contact" style={read_status ? { background: '#dbb0a0', } : { background: '#eab586' }}>
            <div onClick={() => changeStatus(id)}>
                <h3>{name}</h3>
                <p>{email}</p>
                <p>{phone_number}</p>
            </div>
            {read_status ? clickStatus : noStatus}
            <hr />
        </div>
    )

    const contactDetail = (
        <>
            <div className="contact" style={read_status ? { background: '#dbb0a0', } : { background: '#eab586' }}>
                <button className='backButton' type="button" onClick={() => setContactDisplay(false)}>&#8617;</button>
                <h3>{name}</h3>
                <div>
                    <a href={`mailto:${email}`}>{email}</a>
                </div>
                <div className="messageATag">
                    <a href={`tel:${phone_number}`}>{phone_number}</a>
                </div>
                <p className="messageDetail">{question}</p>
                <button className='modalButton report' ref={target} onMouseLeave={() => setShow(false)} onClick={() => reportContact(id)}>
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
        </>
    )

    return (
        <div>
            {contactDisplay ? contactDetail : contactHead}
        </div>
    )
}

export default ContactDetail
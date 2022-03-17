import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import {environment} from '../config/settings'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';


function AdminContactView({ name, email, phone_number, question, reported, id, setReportedContacts, reportedContacts }) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
    // const { handleError } = useOutletContext();
    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const deleteContact = async (id) => {

        let location = ''
        if (environment === 'development'){
            location = 'http://localhost:8000'
        } else if (environment === 'production'){
            location = 'https://safehandsdoula-app-dsj.herokuapp.com'
        }

        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            },
        }

        const response = await fetch(`/api/v1/contacts/${id}/admin/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const updatedContactView = reportedContacts.filter(contact => {
            if (contact.id !== id) {
                return { ...contact }
            }
        })
        setReportedContacts(updatedContactView)
    }

    const approveContact = async (id) => {

        let location = ''
        if (environment === 'development'){
            location = 'http://localhost:8000'
        } else if (environment === 'production'){
            location = 'https://safehandsdoula-app-dsj.herokuapp.com'
        }

        const approve = {
            reported: false,
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(approve)
        }
        const response = await fetch(`/api/v1/contacts/${id}/admin/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const updatedContactView = reportedContacts.filter(contact => {
            if (contact.id !== id) {
                return { ...contact }
            }
        })
        setReportedContacts(updatedContactView)
    }

return (
    <>
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{phone_number}</p>
            <p>{question}</p>
            <button type="button" onClick={() => approveContact(id)}>Approve</button>
            {/* <button type="button" onClick={() => deleteContact(id)}>Delete</button> */}
            <button type="button" onClick={handleShow}>Delete</button>
        </div>
        <hr />

        <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Content</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deleting this item, will permanently remove it from safehandsdoula.com and will not be recoverable. Do you wish to cancel or confirm?
                </Modal.Body>
                <Modal.Footer>
                    <button className='loginRegisterButton' onClick={handleClose}>
                        Cancel
                    </button>
                    <button className='loginRegisterButton' onClick={() => deleteContact(id)}>Confirm Delete</button>
                </Modal.Footer>
            </Modal>
    </>
)
}

export default AdminContactView
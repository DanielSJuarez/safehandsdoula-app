import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';


function AdminContactView({ name, email, phone_number, question, reported, id, setReportedContacts, reportedContacts }) {
    const { handleError } = useOutletContext();
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteContact = async (id) => {

        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            },
        }

        const response = await fetch(`${base_URL}/api/v1/contacts/${id}/admin/`, options).catch(handleError);

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
        const response = await fetch(`${base_URL}/api/v1/contacts/${id}/admin/`, options).catch(handleError);

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
            <div className='profile'>
                <h3>{name}</h3>
                <p>{email}</p>
                <p>{phone_number}</p>
                <p>{question}</p>
                <button className='modalButton' type="button" onClick={() => approveContact(id)}>Approve</button>
                <button className='modalButton adminButton' type="button" onClick={handleShow}>Delete</button>
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
                    <button className='modalButton' onClick={handleClose}>
                        Cancel
                    </button>
                    <button className='modalButton' onClick={() => deleteContact(id)}>Confirm</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminContactView
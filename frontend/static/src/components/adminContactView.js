import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import {environment} from '../config/settings'


function AdminContactView({ name, email, phone_number, question, reported, id, setReportedContacts, reportedContacts }) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();

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

        const response = await fetch(`${location}/api/v1/contacts/${id}/admin/`, options).catch(handleError);

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
        const response = await fetch(`${location}/api/v1/contacts/${id}/admin/`, options).catch(handleError);

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
            <button type="button" onClick={() => deleteContact(id)}>Delete</button>
        </div>
        <hr />
    </>
)
}

export default AdminContactView
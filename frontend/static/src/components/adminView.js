import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom";
import Cookies from 'js-cookie';
import AdminContactView from "./adminContactView";
import AdminProfileView from "./adminProfileView";

function AdminView() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary] = useOutletContext();
    const [reportedProfiles, setReportedProfiles] = useState(null);
    const [reportedContacts, setReportedContacts] = useState(null);

    useEffect(() => {
        const isProfileReported = async () => {
            const response = await fetch('/api/v1/accounts/admin/').catch(handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setReportedProfiles(data)

            }
        }
        isProfileReported();
    }, []);

    useEffect(() => {
        const isContactReported = async () => {
            const response = await fetch('/api/v1/contact/admin/').catch(handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setReportedContacts(data)
            }
        }
        isContactReported();
    }, []);

    const profiles = reportedProfiles.filter (profiles => (
        profiles.reported === true
    ))

    const profileList = profiles.map(profiles => {
        <AdminProfileView key={profiles.id} {...profiles}/>
    })

    const contacts = reportedContacts.filter (contacts => (
        contacts.reported === true
    ))

    const contactsList = contacts.map(contacts => {
        <AdminContactView key={contacts.id} {...contacts}/>  
    })


    return (
        <>
        <div>
            {contactsList}
        </div>
        <div>
            {profileList}
        </div>
        </>
    )
}

export default AdminView
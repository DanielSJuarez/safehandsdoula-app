import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom";
import AdminContactView from "./adminContactView";
import AdminProfileView from "./adminProfileView";

function AdminView() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
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
            const response = await fetch('/api/v1/contacts/admin/').catch(handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setReportedContacts(data)
            }
        }
        isContactReported();
    }, []);

    if (!reportedContacts) {
        return <div>Fetching contact data....</div>
    }

    if (!reportedProfiles) {
        return <div>Fetching profile data....</div>
    }

    const profilesReportedList = reportedProfiles.filter(profiles => (
        profiles.reported === true
    ))

    const profileList = profilesReportedList.map(profiles => (
        <AdminProfileView key={profiles.id} {...profiles} setReportedProfiles={setReportedProfiles} reportedProfiles={reportedProfiles} />
    ))

    const contactsReportedList = reportedContacts.filter(contacts => (
        contacts.reported === true
    ))

    const contactsList = contactsReportedList.map(contacts => (
        <AdminContactView key={contacts.id} {...contacts} setReportedContacts={setReportedContacts} reportedContacts={reportedContacts} />
    ))


    return (
        <>
            <div className="row">
                <div className="col-3 contactList">
                    <h2>Reported Contacts</h2>
                    {contactsList}
                </div>
                <div className='col-9'>
                    <h2>Reported Profiles</h2>
                    {profileList}
                </div>
            </div>
        </>
    )
}

export default AdminView
import { useState, useEffect } from 'react'
import ProfilesDiplayView from './profileDisplayView';
import ProfileView from './profileView';
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'
import Spinner from 'react-bootstrap/Spinner'

function ProfilesList() {
    const { handleError, isSummary, setIsSummary } = useOutletContext();
    const [profiles, setProfiles] = useState(null)
    const [getId, setGetId] = useState('')

    useEffect(() => {
        const getActiveProfiles = async () => {

            const response = await fetch(`${base_URL}/api/v1/accounts/`).catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setProfiles(data);
            }
        }
        getActiveProfiles();
    }, []);

    if (!profiles) {
        return <div>Fetching profile data....
            <Spinner animation="border" size="sm" />
        </div>
    }

    const profileFilter = profiles.filter(profiles => (
        profiles.id === getId
    ))

    const activeFilter = profiles.filter(profiles => (
        profiles.is_active === 'ACT'
    ))

    const profileSummaryHTML = activeFilter.map((profiles) => (
        <ProfilesDiplayView key={profiles.id} {...profiles} setGetId={setGetId} setIsSummary={setIsSummary} />
    ))

    const profileDetailHTML = profileFilter.map((profiles) => (
        <ProfileView key={profiles.id} {...profiles} setIsSummary={setIsSummary} />
    ))

    return (
        <div className='container'>
            <div className='row'>
                {isSummary ? profileDetailHTML : profileSummaryHTML}
            </div>
        </div>
    )
}

export default ProfilesList
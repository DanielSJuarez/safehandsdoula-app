import { useState, useEffect } from 'react'
import ProfilesDiplayView from './profileDisplayView';
import ProfileView from './profileView';
import { useOutletContext } from "react-router-dom";
import { environment } from '../config/settings'

function ProfilesList() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
    const [profiles, setProfiles] = useState(null)
    // const [isSummary, setIsSummary] = useState(false)
    const [getId, setGetId] = useState('')

    useEffect(() => {
        const getActiveProfiles = async () => {
            let location = ''
            if (environment === 'development') {
                location = 'http://localhost:8000'
            } else if (environment === 'production') {
                location = 'https://safehandsdoula-app-dsj.herokuapp.com'
            }

            const response = await fetch(`${location}/api/v1/accounts/`).catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                console.log(data)
                setProfiles(data);
            }
        }
        getActiveProfiles();
    }, []);

    if (!profiles) {
        return <div>Fetching profile data....</div>
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
        <div className='container profileList'>
            <div className='row'>
                {isSummary ? profileDetailHTML : profileSummaryHTML}
            </div>
        </div>
    )
}

export default ProfilesList
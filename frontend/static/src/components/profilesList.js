import { useState, useEffect } from 'react'
import ProfilesDiplayView from './profileDisplayView';
import ProfileView from './profileView';
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";

function ProfilesList(){
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg] = useOutletContext();
    const [profiles, setProfiles] = useState(null)
    const [isSummary, setIsSummary] = useState(false)
    const [getId, setGetId] = useState('')
   
    useEffect(() => {
        const getActiveProfiles = async () => {
            const response = await fetch('/api/v1/accounts/').catch(handleError);

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

    const profileSummaryHTML = profiles.map((profiles) => (
        <ProfilesDiplayView key={profiles.id} {...profiles} setGetId={setGetId} setIsSummary={setIsSummary}/>
    ))

    const profileDetailHTML = profileFilter.map((profiles) => (
        <ProfileView key={profiles.id} {...profiles} setIsSummary={setIsSummary}/>
    ))

    return (
        <div>
            {isSummary ? profileDetailHTML : profileSummaryHTML}
        </div>
    )
}

export default ProfilesList
import { useState, useEffect } from 'react'
import ProfileDetail from './profileDetail';

function DoulaProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState(null)
    
    const handleError = (err) => {
        console.log(err);
    }

    useEffect(() => {
        const getProfile = async () => {
            const response = await fetch('/api/v1/accounts/doula/').catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setProfile(data);
            }
        }
        getProfile();
    }, []);

    if (!profile) {
        return <div>Fetching profile data....</div>
    }

    const displayMode = profile.map(profile => (
        <ProfileDetail key={profile.id} {...profile} />
    ))

    const editMode = (
        <div>hi</div>
    )

    return (
        <div>
            {displayMode}
        </div>
    )
}

export default DoulaProfile
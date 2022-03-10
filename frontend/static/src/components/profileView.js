import { useState } from 'react'
import { InlineWidget } from "react-calendly";

function ProfileView({ image, name, started, facebook, twitter, instagram, website, about, services, why, certification, setIsSummary}) {
    const [isAuthenicated, setIsAuthenicated] = useState(false)

    // const contactSubmitView = (

    // )

    // const setupMeetingView = (

    // )

    return (
        <section className='col article'>
            <div className='imgHolder'>
                <img src={image} alt={name} />
            </div>
            <h2>{name}</h2>
            <p>{started}</p>
            <a target='blank' href={facebook}>{facebook}</a>
            <a target='blank' href={twitter}>{twitter}</a>
            <a target='blank' href={instagram}>{instagram}</a>
            <a target='blank' href={website}>{website}</a>
            <p>{certification}</p>
            <p className='summary'>{about}</p>
            <p className='summary'>{services}</p>
            <p className='summary'>{why}</p>
            {/* <p>{calendly}</p> */}
            {/* <CalendlyWidget calendly={calendly}/> */}
            {/* <InlineWidget url={calendly} /> */}
            <button onClick={() => setIsSummary(false)} >Back to Doula's</button>
        </section>
    )
}

export default ProfileView
import { useState } from 'react'
import { InlineWidget } from "react-calendly";
import { useOutletContext } from "react-router-dom";
import ContactDoula from './contactDoula'

function ProfileView({ image, name, started, facebook, twitter, instagram, website, about, services, why, certification, setIsSummary , id}) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg] = useOutletContext();
    const [isAuthenicated, setIsAuthenicated] = useState(false)

    const isLogin = (
        <ContactDoula id={id}/>
    )

    const notIsLogin = (
        <p>Please create an account or login to contact this doula</p>
    )

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
            <p>Contact</p>
            {auth ? isLogin : notIsLogin}
             <InlineWidget url='https://calendly.com/juarezdsv' />
        </section>
    )
}

export default ProfileView
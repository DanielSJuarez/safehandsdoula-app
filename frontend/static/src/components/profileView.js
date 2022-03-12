import { useState } from 'react'
import { InlineWidget } from "react-calendly";
import { useOutletContext } from "react-router-dom";
import ContactDoula from './contactDoula'

function ProfileView({ image, name, started, facebook, twitter, instagram, website, about, services, why, certification, setIsSummary, id, calendly, linked }) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg] = useOutletContext();
    const [isAuthenicated, setIsAuthenicated] = useState(false)

    const isLogin = (
        <ContactDoula id={id} />
    )

    const notIsLogin = (
        <p>Please create an account or login to contact this doula</p>
    )
    console.log(calendly)
    const isNotCalendly = (
        <div></div>
    )

    const isCalendly = (
        <InlineWidget url={calendly} />
    )

    return (
        <section className='col profile'>
            <div className='row'>
                <div className='col-2'>
                    <div className='imgHolder'>
                        <img src={image} alt={name} className='image' />
                    </div>
                </div>
                <div className='col-4 profileTopInfo'>
                    <label htmlFor='name'>Name</label>
                    <h2>{name}</h2>
                </div>
                <div className='col-4 profileTopInfo'>
                    <label htmlFor='started'>Started</label>
                    <p>{started}</p>
                </div>
            </div>
            <div className='socials row'>
                <label htmlFor='socials'>My Social's</label>
                <div className='col-3'>
                    <label htmlFor='facebook col-3'>Facebook</label>
                    <a target='blank' href={facebook}>{facebook}</a>
                </div>
                <div className='col-3'>
                    <label htmlFor='twitter'>Twitter</label>
                    <a target='blank' href={twitter}>{twitter}</a>
                </div>
                <div className='col-3'>
                    <label htmlFor='instagran'>Instagram</label>
                    <a target='blank' href={instagram}>{instagram}</a>
                </div>
                <div className='col-3'>
                    <label htmlFor='website'>Personal Website</label>
                    <a target='blank' href={website}>{website}</a>
                </div>
            </div>
            <div className='info'>
                <label htmlFor='certification'>Certifications</label>
                <p>{certification}</p>
            </div>
            <div className='info'>
                <label htmlFor='about'>About Me</label>
                <p className='summary'>{about}</p>
            </div>
            <div className='info'>
                <label htmlFor='services'>My Services</label>
                <p className='summary'>{services}</p>
            </div>
            <div className='info'>
                <label htmlFor='why'>Why Me</label>
                <p className='summary'>{why}</p>
            </div>
            <button onClick={() => setIsSummary(false)} >Back to Doula's</button>
            <p>Contact</p>
            {auth ? isLogin : notIsLogin}
            <div className='calendly'>
                {linked ? isCalendly : isNotCalendly}
            </div>
        </section>
    )
}

export default ProfileView
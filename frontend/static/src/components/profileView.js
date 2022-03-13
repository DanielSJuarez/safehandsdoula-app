import { useState } from 'react'
import { InlineWidget } from "react-calendly";
import { useOutletContext } from "react-router-dom";
import ContactDoula from './contactDoula'

function ProfileView({ image, name, started, facebook, twitter, instagram, website, about, services, why, certification, id, calendly, linked }) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary] = useOutletContext();
    const [isAuthenicated, setIsAuthenicated] = useState(false)

    const isLogin = (
        <ContactDoula id={id} />
    )

    const notIsLogin = (
        <p>Please create an account or login to contact this doula</p>
    )
    // console.log(calendly)
    const isNotCalendly = (
        <div></div>
    )

    const isCalendly = (
        <div className='calendly'>
            <InlineWidget url={calendly} />
        </div>
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
                    <label htmlFor='started' className='label'>Started</label>
                    <p>{started}</p>
                </div>
            </div>
            <hr />
            <div className='socials row'>
                <h3>My Social's</h3>
                {/* <label htmlFor='socials'>My Social's</label> */}
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
            <hr />
            <div className='info'>
                {/* <h3>Certifications</h3> */}
                <label htmlFor='certification' className='label'>Certifications</label>
                <p>{certification}</p>
            </div>
            <div className='info'>
                <label htmlFor='about' className='label'>About Me</label>
                <p className='summary'>{about}</p>
            </div>
            <div className='info'>
                <label htmlFor='services' className='label'>My Services</label>
                <p className='summary'>{services}</p>
            </div>
            <div className='info'>
                <label htmlFor='why' className='label'>Why Me</label>
                <p className='summary'>{why}</p>
            </div>
            <button onClick={() => setIsSummary(false)} className='loginRegisterButton'>Back to Doula's</button>
            <hr />
            <h3>Contact Me</h3>
            {auth ? isLogin : notIsLogin}
            <div>
                {linked ? isCalendly : isNotCalendly}
            </div>
        </section>
    )
}

export default ProfileView
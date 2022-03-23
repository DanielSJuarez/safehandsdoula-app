import { useState, useEffect, useRef } from 'react'
import { InlineWidget } from "react-calendly";
import { useOutletContext } from "react-router-dom";
import ContactDoula from './contactDoula'
import Cookies from 'js-cookie';
import { base_URL } from '../config/settings'
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, } from '@fortawesome/free-brands-svg-icons'
import { faComputer } from '@fortawesome/free-solid-svg-icons'


function ProfileView({ image, name, started, facebook, twitter, instagram, website, about, services, why, certification, id, calendly, city, state, service_range, display_calendly }) {
    const { auth, handleError, setIsSummary } = useOutletContext();
    const [show, setShow] = useState(false);
    const [iconFaceBook, setIconFacebook] = useState(false)
    const [iconInstagram, setIconInstagram] = useState(false)
    const [iconTwitter, setIconTwitter] = useState(false)
    const [iconWeb, setIconWeb] = useState(false)
    const target = useRef(null);

    useEffect(() => {
        const checkSocialStatus = async () => {
            if (facebook === '') {
                setIconFacebook(true)
            }

            if (instagram === '') {
                setIconInstagram(true)
            }

            if (twitter === '') {
                setIconTwitter(true)
            }

            if (website === '') {
                setIconWeb(true)
            }
        }
        checkSocialStatus();
    }, []);

    const isLogin = (
        <>
            <ContactDoula id={id} />
            <button className='loginRegisterButton report' ref={target} onMouseLeave={() => setShow(false)} onClick={() => reportProfile(id)}>
                Report
            </button>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Reported
                    </Tooltip>
                )}
            </Overlay>
        </>
    )

    const notIsLogin = (
        <p>Please <a href='/register'>create an account</a> or <a href='/login'>login</a> to contact this doula, or report this account</p>
    )

    const displayAll = (
        <>
            <ContactDoula id={id} />
            <div className='calendly'>
                <InlineWidget url={calendly} />
            </div>
            <button className='loginRegisterButton report' ref={target} onMouseLeave={() => setShow(false)} onClick={() => reportProfile(id)}>
                Report
            </button>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Reported
                    </Tooltip>
                )}
            </Overlay>
        </>
    )

    const reportProfile = async (id) => {

        const report = {
            reported: true,
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(report)
        }
        const response = await fetch(`${base_URL}/api/v1/accounts/doula/${id}/report/`, options).catch(handleError);
        setShow(true)
    }

    return (
        <section className='col profile'>
            <button onClick={() => setIsSummary(false)} className='loginRegisterButton'>Back to Doula's</button>
            <div className='row justify-content-between'>
                <div className='col-md-12 col-lg-3'>
                    <div className='imgHolder'>
                        <img src={image} alt={name} className='image' />
                    </div>
                </div>
                <div className='col-lg-2 intro'>
                    <label htmlFor='name'>Name</label>
                    <h2>{name}</h2>
                </div>
                <div className="col-lg-5 intro">
                    <label htmlFor='started' className="label">Started</label>
                    <p>{started}</p>
                    <label htmlFor='started' className="label">City</label>
                    <p>{city}</p>
                    <label htmlFor='started' className="label">State</label>
                    <p>{state}</p>
                    <label htmlFor='range' className="label">Service Range</label>
                    <p>{service_range}</p>
                </div>
            </div>
            <hr />
            <div className='socials row'>
                <h3>My Socials</h3>
                <div className='col-1'>
                    <a style={iconFaceBook ? { display: 'none' } : { display: 'unset' }} target='blank' href={facebook}><FontAwesomeIcon icon={faFacebookSquare} className='icon'></FontAwesomeIcon></a>
                </div>
                <div className='col-1'>
                    <a style={iconTwitter ? { display: 'none' } : { display: 'unset' }} target='blank' href={twitter}><FontAwesomeIcon icon={faTwitterSquare} className='icon'></FontAwesomeIcon></a>
                </div>
                <div className='col-1'>
                    <a style={iconInstagram ? { display: 'none' } : { display: 'unset' }} target='blank' href={instagram}><FontAwesomeIcon icon={faInstagramSquare} className='icon'></FontAwesomeIcon></a>
                </div>
                <div className='col-1'>
                    <a style={iconWeb ? { display: 'none' } : { display: 'unset' }} target='blank' href={website}><FontAwesomeIcon icon={faComputer} className='icon'></FontAwesomeIcon></a>
                </div>
            </div>
            <hr />
            <div className='info'>
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
            <hr />
            <h3>Contact Me</h3>
            <div>
                {auth ? display_calendly ? displayAll : isLogin : notIsLogin}
            </div>
        </section>
    )
}

export default ProfileView
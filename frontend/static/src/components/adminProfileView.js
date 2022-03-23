import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, } from '@fortawesome/free-brands-svg-icons'
import { faComputer } from '@fortawesome/free-solid-svg-icons'


function AdminProfileView({ name, started, facebook, twitter, instagram, website, about, services, why, image, certification, id, setReportedProfiles, reportedProfiles, city, state, service_range }) {
    const { handleError } = useOutletContext();
    const [show, setShow] = useState(false);
    const [iconFaceBook, setIconFacebook] = useState(false)
    const [iconInstagram, setIconInstagram] = useState(false)
    const [iconTwitter, setIconTwitter] = useState(false)
    const [iconWeb, setIconWeb] = useState(false)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const deleteProfile = async (id) => {

        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            },
        }

        const response = await fetch(`${base_URL}/api/v1/accounts/${id}/admin/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const updatedProfileView = reportedProfiles.filter(profile => {
            if (profile.id !== id) {
                return { ...profile }
            }
        })
        setReportedProfiles(updatedProfileView)
    }

    const approveProfile = async (id) => {

        const approve = {
            reported: false,
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(approve)
        }
        const response = await fetch(`${base_URL}/api/v1/accounts/${id}/admin/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const updatedProfileView = reportedProfiles.filter(profile => {
            if (profile.id !== id) {
                return { ...profile }
            }
        })
        setReportedProfiles(updatedProfileView)
    }

    return (
        <>
            <section className='col profile'>
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
                    <h3>Socials</h3>
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
                <button type="button" className='modalButton' onClick={() => approveProfile(id)}>Approve</button>
                <button type="button" className='modalButton adminButton' onClick={handleShow}>Delete</button>
            </section>
            <hr />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Content</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deleting this item, will permanently remove it from safehandsdoula.com and will not be recoverable. Do you wish to cancel or confirm?
                </Modal.Body>
                <Modal.Footer>
                    <button className='modalButton' onClick={handleClose}>
                        Cancel
                    </button>
                    <button className='modalButton' onClick={() => deleteProfile(id)}>Confirm</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminProfileView
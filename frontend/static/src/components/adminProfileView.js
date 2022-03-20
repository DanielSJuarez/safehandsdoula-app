import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import {base_URL} from '../config/settings'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';


function AdminProfileView ({name, started, facebook, twitter, instagram, website, about, services, why, calendly, image, certification, reported ,  id, setReportedProfiles, reportedProfiles, city, state, service_range}){
    // const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
    const { handleError } = useOutletContext();
    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
          if (profile.id !== id){
              return {...profile}
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

    return(
        <>
        <section className='col profile'>
            <div className='row'>
                <div className='col-2'>
                    <div className='imgHolder'>
                        <img src={image} alt={name} className='image' />
                    </div>
                </div>
                <div className='col profileTopInfo'>
                    <label htmlFor='name'>Name</label>
                    <h2>{name}</h2>
                </div>
                <div className='col profileTopInfo'>
                    <label htmlFor='city' className='label'>City</label>
                    <p>{city}</p>
                </div>
                <div className='col profileTopInfo'>
                    <label htmlFor='state' className='label'>State</label>
                    <p>{state}</p>
                </div>
                <div className='col profileTopInfo'>
                    <label htmlFor='serviceRange' className='label'>Service Range</label>
                    <p>{service_range}</p>
                </div>
                <div className='col profileTopInfo'>
                    <label htmlFor='started' className='label'>Started</label>
                    <p>{started}</p>
                </div>
            </div>
            <hr />
            <div className='socials row'>
                <h3>Socials</h3>
                {/* <label htmlFor='socials'>My Social's</label> */}
                <div className='col-3'>
                    <label htmlFor='facebook'>Facebook</label>
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
        {/* <section className='col article'>
             <div className='imgHolder'>
                <img src={image} alt={name} />
            </div>
            <h2>{name}</h2>
            <label htmlFor='started'>Started</label>
            <p>{started}</p>
            <label htmlFor='location'>Location</label>
            <p>{city}</p>
            <p>{state}</p>
            <label htmlFor='serviceRange'>Service Range(miles)</label>
            <p>{service_range}</p>
            <a target='blank' href={facebook}>{facebook}</a>
            <a target='blank' href={twitter}>{twitter}</a>
            <a target='blank' href={instagram}>{instagram}</a>
            <a target='blank' href={website}>{website}</a>
            <p>{certification}</p>
            <p className='summary'>{about}</p>
            <p className='summary'>{services}</p>
            <p className='summary'>{why}</p>
            <p>{calendly}</p> */}
            <button type="button" className='modalButton' onClick={() => approveProfile(id)}>Approve</button>
            {/* <button type="button" onClick={() => deleteProfile(id)}>Delete</button> */}
            <button type="button" className='modalButton adminButton' onClick={handleShow}>Delete</button>
        </section>
        <hr/>

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
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import {environment} from '../config/settings'


function AdminProfileView ({name, started, facebook, twitter, instagram, website, about, services, why, calendly, image, certification, reported ,  id, setReportedProfiles, reportedProfiles}){
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
    // const { handleError } = useOutletContext();
    const deleteProfile = async (id) => {

        let location = ''
        if (environment === 'development'){
            location = 'http://localhost:8000'
        } else if (environment === 'production'){
            location = 'https://safehandsdoula-app-dsj.herokuapp.com'
        }

        const options = {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
          },
        }
    
        const response = await fetch(`/api/v1/accounts/${id}/admin/`, options).catch(handleError);
    
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

        let location = ''
        if (environment === 'development'){
            location = 'http://localhost:8000'
        } else if (environment === 'production'){
            location = 'https://safehandsdoula-app-dsj.herokuapp.com'
        }

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
        const response = await fetch(`/api/v1/accounts/${id}/admin/`, options).catch(handleError);

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
            <p>{calendly}</p>
            <button type="button" onClick={() => approveProfile(id)}>Approve</button>
            <button type="button" onClick={() => deleteProfile(id)}>Delete</button>
        </section>
        <hr/>
        </>
    )
}

export default AdminProfileView
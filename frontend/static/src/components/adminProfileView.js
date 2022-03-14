import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";

function AdminProfileView ({name, started, facebook, twitter, instagram, website, about, services, why, calendly, image, certification, reported ,  id, setReportedProfiles, reportedProfiles}){
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();

    const deleteProfile = async (id) => {

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

    return(

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
            {/* <button type="button" onClick={() => approveProfile(id)}>Approve</button> */}
            <button type="button" onClick={() => deleteProfile(id)}>Delete</button>
        </section>
    )
}

export default AdminProfileView
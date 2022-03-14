import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";


function AdminContactView({ name, email, phone_number, question, reported, id, setReportedContacts , reportedContacts}) {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();

    const deleteContact = async (id) => {

        const options = {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
          },
        }
    
        const response = await fetch(`/api/v1/contacts/${id}/admin/`, options).catch(handleError);
    
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        const updatedContactView = reportedContacts.filter(contact => {
          if (contact.id !== id){
              return {...contact}
          }
        })
        setReportedContacts(updatedContactView)
      }
      
    return (
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{phone_number}</p>
            <p>{question}</p>
            {/* <button type="button" onClick={() => approveContact(id)}>Approve</button> */}
            <button type="button" onClick={() => deleteContact(id)}>Delete</button>
        </div>
    )
}

export default AdminContactView
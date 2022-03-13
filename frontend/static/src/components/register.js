import { useState } from 'react';
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";

function Register(){
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary] = useOutletContext();
    const [newState, setNewState] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const doula = () => {
        setCreateDoula(!createDoula)
    }

    const newHandleInput = (event) => {
        const { name, value } = event.target;

        setNewState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleCreateSubmit = async event => {
        event.preventDefault();
        if(newState.password1 < 8|| newState.password2 < 8){
            alert('Password is to short, password must be eight characters long')
        } else if (newState.password1 !== newState.password2) {
            alert('Passwords to not match, please try again')
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(newState),
        }

        const response = await fetch('/rest-auth/registration/', options).catch(
            handleError
        )

        if (!response.ok) {
            throw new Error('Network response not ok!');
        } else {
            const data = await response.json();
            Cookies.set('Authorization', `Token ${data.key}`);
            setAuth(true);
            setNewState({
                username: '',
                email: '',
                password1: '',
                password2: '',
            });
        }
        console.log(createDoula)
        if (createDoula === true) {
            navigate('/create');
        } else {
            navigate('/home');
        }
    }

        return (
        <>
        <div className='loginPlacholder'>
            <form onSubmit={handleCreateSubmit}>
                <div className='col loginField'>
                    <label htmlFor='username'>Username</label>
                    <input className='inputField' type='text' name='username' id='username' placeholder='username' onChange={newHandleInput} required value={newState.username} />
                </div>
                <div className='col loginField'>
                    <label htmlFor='email'>Email</label>
                    <input className='inputField' type='email' name='email' id='email' placeholder='email' onChange={newHandleInput} required value={newState.email} />
                </div>
                <div className='col loginField'>
                    <label htmlFor='password1'>Password</label>
                    <input className='inputField' type='password' name='password1' id='password' placeholder='password' onChange={newHandleInput} required value={newState.password1}/>
                </div>
                <div className='col loginField'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input className='inputField' type='password' name='password2' id='password' placeholder='password' onChange={newHandleInput} required value={newState.password2}/>
                </div>
                <div className='col doulacheckPlacholder'>
                <label htmlFor='checkbox'>Are you a doula?</label>
                    <input className='doulaCheck' type='checkbox' onChange={() => doula()}/>
                </div>
                <div className='col loginField'>
                    <button className='loginRegisterButton' type='submit'>Create Account</button>
                </div>
            </form>
        </div>
        <div className='pageSupport'>
            <p>“The so called miracle of birth is nature getting her own way.” - Camille Paglia</p>
        </div>
        </>
        )
}

export default Register
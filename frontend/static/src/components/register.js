import { useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'

function Register() {
    const { setAuth, navigate, createDoula, setCreateDoula, handleError } = useOutletContext();
    const [newState, setNewState] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState(false);
    const target = useRef(null);
    const newTarget = useRef(null);

    const doula = () => {
        setCreateDoula(!createDoula)
    }

    const overlay = () => {
        setShow(false)
        setDisplay(false)
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

        if (newState.password1.length < 8 || newState.password2.length < 8) {
            setShow(true)
        } else if (newState.password1 !== newState.password2) {
            setDisplay(true)
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(newState),
        }

        const response = await fetch(`${base_URL}/rest-auth/registration/`, options).catch(
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

        if (createDoula === true) {
            navigate('/create');
        } else {
            navigate('/home');
        }
    }

    return (
        <>
            <div className='loginPlacholder form'>
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
                        <input className='inputField' ref={target} type='password' name='password1' id='password' placeholder='password' onChange={newHandleInput} required value={newState.password1} />
                        <Overlay target={target.current} show={show} placement="bottom-end">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    Password must be 8 characters long
                                </Tooltip>
                            )}
                        </Overlay>
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='password2'>Confirm Password</label>
                        <input className='inputField' ref={newTarget} type='password' name='password2' id='password' placeholder='password' onChange={newHandleInput} required value={newState.password2} />
                        <Overlay target={newTarget.current} show={display} placement="bottom-end">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    Passwords do not match
                                </Tooltip>
                            )}
                        </Overlay>
                    </div>
                    <div className='col doulacheckPlacholder'>
                        <label htmlFor='checkbox'>Are you a doula?</label>
                        <input className='doulaCheck' type='checkbox' onChange={() => doula()} />
                    </div>
                    <div className='col loginField'>
                        <button className='loginRegisterButton' onMouseLeave={() => overlay()} type='submit'>Create Account</button>
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
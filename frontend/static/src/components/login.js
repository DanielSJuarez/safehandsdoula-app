import { useState, useRef  } from 'react'
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'

function Login() {
    // const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
    const { setAuth, navigate, setIsDoula, handleError, setIsSuperUser } = useOutletContext();
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const [show, setShow] = useState(false);
    const target = useRef(null);

    const handleSubmit = async event => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch(`${base_URL}/rest-auth/login/`, options).catch(
            handleError
        )

        if (!response.ok) {
            setShow(true)
            throw new Error('Network response not ok!');     
        } else {
            const data = await response.json();
            Cookies.set('Authorization', `Token ${data.key}`);
            setAuth(true);
            setState({
                username: '',
                password: ''
            })
            if (data.is_superuser == true) {
                setIsDoula(true)
                setIsSuperUser(true)
            }
            setShow(false)
            navigate('/home');
        }
    }

    const handleInput = (event) => {
        const { name, value } = event.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <>
            <div className='loginPlacholder form'>
                <form onSubmit={handleSubmit}>
                    <div className='col loginField'>
                        <label htmlFor='username'>Username</label>
                        <input type='text'  className='inputField' name='username' id='username' placeholder='username' onChange={handleInput} required value={state.username} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='password'>Password</label>
                        <input type='password'  className='inputField' name='password' id='password' placeholder='password' onChange={handleInput} required value={state.password} />
                    </div>
                    <div className='col loginField'>
                        <button className='loginRegisterButton homeButton' type='button' onClick={() => navigate('/home')}>Home</button>
                        <button ref={target} className='loginRegisterButton' onMouseLeave={() => setShow(false)} type='submit'>Login</button>
                        <Overlay target={target.current} show={show} placement="bottom-start">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    Username or Password are incorrect
                                </Tooltip>
                            )}
                        </Overlay>
                    </div>
                </form>
            </div>
            <div className='pageSupport'>
                <p>“Birth is the pinnacle where women discover the courage to become mothers.” - Anita Diamant</p>
            </div>
        </>
    )
}

export default Login
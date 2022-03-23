import { useState, useRef } from 'react'
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'

function Login() {
    const { setAuth, navigate, setIsDoula, handleError, setIsSuperUser } = useOutletContext();
    const [error, setError] = useState('')
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
            const message = await response.json()
            if (message.non_field_errors) {
                setError(message.non_field_errors[0]);
            }
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
            if (data.is_superuser === true) {
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
                        <input type='text' className='inputField' name='username' id='username' placeholder='username' onChange={handleInput} required value={state.username} />
                    </div>
                    <div className='col loginField'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' className='inputField' name='password' id='password' placeholder='password' onChange={handleInput} required value={state.password} />
                    </div>
                    <div className='col loginField'>
                        <button className='loginRegisterButton homeButton' type='button' onClick={() => navigate('/home')}>Home</button>
                        <button ref={target} className='loginRegisterButton' onMouseLeave={() => setShow(false)} type='submit'>Login</button>
                        <Overlay target={target.current} show={show} placement="bottom-start">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    {error}
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
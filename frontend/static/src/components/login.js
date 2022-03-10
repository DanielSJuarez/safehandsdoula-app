import { useState } from 'react'
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";

function Login() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg] = useOutletContext();
    const [state, setState] = useState({
        username: '',
        password: ''
    });

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

        const response = await fetch('/rest-auth/login/', options).catch(
            handleError
        )

        if (!response.ok) {
            throw new Error('Network response not ok!');
        } else {
            const data = await response.json();
            Cookies.set('Authorization', `Token ${data.key}`);
            setAuth(true);
            setState({
                username: '',
                password: ''
            })
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
        <div className='loginPlacholder'>
            <form onSubmit={handleSubmit}>
                <div className='col loginField'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' className='inputField' name='username' id='username' placeholder='username' onChange={handleInput} required value={state.username} />
                </div>
                <div className='col loginField'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' className='inputField' name='password' id='password' placeholder='password' onChange={handleInput} required value={state.password}/>
                </div>
                <div className='col loginField'>
                    <button className='loginRegisterButton' type='button' onClick={() => navigate('/home')}>Back</button>
                    <button className='loginRegisterButton' type='submit'>Login</button>
                </div>
            </form>
        </div>
        <div>
            <p>Instasdfasflsadjf;lskajf;alskjf;lsdkjf;lsdakfj;alsdkfj;sladkfjasd;lkfjasdl;kf</p>
        </div>
        </>
    )
}

export default Login
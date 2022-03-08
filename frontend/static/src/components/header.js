import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { NavLink, Link } from 'react-router-dom';

function Header(props) {

    const handleError = (err) => {
        console.log(err);
    }

    useEffect(() => {
        const isDoula = async () => {
            const response = await fetch('/api/v1/accounts/doula/').catch(handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                if (data[0].is_doula == true) {
                    props.setIsDoula(true)
                }
            }
        }
        isDoula();
    }, []);

    const handleLogout = async event => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch('/rest-auth/logout/', options).catch(
            handleError
        )

        const data = await response.json();
        Cookies.remove('Authorization', `Token ${data.key}`);
        props.setIsDoula(false);
        props.setAuth(false);
        props.navigate('/home');
    }

    const user = (
        <ul className='row header mx-0'>
              <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/home'>Home</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/what'>What</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/how'>How</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/areadoula'>Doula's</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
        </ul>
    )

    const doulaUser = (
        <ul className='row header mx-0'>
             <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/home'>Home</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/what'>What</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/how'>How</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/profile'>Profile</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/areadoula'>Doula's</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
        </ul>
    )

    const visitor = (
        <ul className='row header mx-0'>
           <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/home'>Home</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/what'>What</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/how'>How</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/yourplan'>Your Plan</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/areadoula'>Doula's</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <Link className='navLinks' to='/login'>Login</Link>
            </li>
            <li className='col navLinkButton mx-0'>
                <Link className='navLinks' to='/register'>Create Account</Link>
            </li>
        </ul>

    )

    return (
        <nav>
            {props.auth ? props.isDoula ? doulaUser : user : visitor}
        </nav>
    )
}

export default Header
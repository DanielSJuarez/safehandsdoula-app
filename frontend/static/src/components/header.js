import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { NavLink, Link } from 'react-router-dom';

function Header(props) {

    const handleError = (err) => {
        console.log(err);
    }

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
        props.setCreateDoula(false);
        props.navigate('/home')
    }

    const user = (
        <ul className='row header mx-0'>
              <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/home'>Home</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/create'>Create Article</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/popular'>Popular Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/trending'>Trending Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/all'>Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <Link className='navLinks' to='/register'>Create Doula Account</Link>
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
                <NavLink className='navLinks' to='/create'>Create Article</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/popular'>Popular Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/trending'>Trending Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/all'>Articles</NavLink>
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
                <NavLink className='navLinks' to='/create'>Create Article</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/popular'>Popular Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/trending'>Trending Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/all'>Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <Link className='navLinks' to='/login'>Login</Link>
            </li>
            <li className='col navLinkButton mx-0'>
                <Link className='navLinks' to='/register'>Create Account</Link>
            </li>
            <li className='col navLinkButton mx-0'>
                <Link className='navLinks' to='/register'>Create Doula Account</Link>
            </li>
        </ul>

    )

    return (
        <div>
            {props.auth ? user : visitor}
        </div>
    )
}

export default Header
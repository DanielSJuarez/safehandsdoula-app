import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { NavLink, Link } from 'react-router-dom';
import { base_URL } from '../config/settings';

function Header(props) {

    const checkActive = () => {
        if (props.isSummary === true) {
            props.setIsSummary(false)
            console.log('asfasdfs')
        }
    }

    useEffect(() => {
        const getIsAdmin = async () => {

            const response = await fetch(`${base_URL}/rest-auth/user/`).catch(props.handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                // console.log('hi')
                if (data.is_superuser == true) {
                    props.setIsDoula(true)
                    props.setIsSuperUser(true)

                } else {
                    isDoula()
                }
            }
        }
        if (props.auth) {
            getIsAdmin();
        }
    }, []);

    const isDoula = async () => {

        const response = await fetch(`${base_URL}/api/v1/accounts/doula/`).catch(props.handleError);
        if (!response.ok) {
            throw new Error('Netword response was not OK!')
        } else {
            const data = await response.json();
            if (data[0].is_doula === true) {
                props.setIsDoula(true)
                props.setProfileImg(data[0].image)
            }
        }
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

        const response = await fetch(`${base_URL}/rest-auth/logout/`, options).catch(
            props.handleError
        )

        const data = await response.json();
        Cookies.remove('Authorization', `Token ${data.key}`);
        props.setIsSuperUser(false)
        props.setIsDoula(false);
        props.setAuth(false);
        props.navigate('/home');
    }

    const user = (
        <ul className='row header mx-0'>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/home" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>Home</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/what" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>What</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/how" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>How</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/why" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>Why</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/doula" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={checkActive}>Find a Doula</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
        </ul>
    )

    const doulaUser = (
        <ul className='row header mx-0'>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/home" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>Home</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/what" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>What</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/how" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>How</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/why" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>Why</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/doula" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={checkActive}> Find a Doula</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/profile" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>Profile</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
            <div className='headImgHolder' onClick={() => props.navigate('/profile')}>
                <img src={props.profileImg} alt='profile image' className='headImg' />
            </div>
        </ul>
    )

    const visitor = (
        <ul className='row header mx-0'>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/home" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>Home</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/what" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>What</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/how" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>How</NavLink>

            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/why" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>Why</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/doula" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={checkActive}>Find a Doula</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <Link className='navLinks' to='/login'>Login</Link>
            </li>
            <li className='col navLinkButton mx-0'>
                <Link className='navLinks' to='/register'>Create Account</Link>
            </li>
        </ul>
    )

    const adminUser = (
        <ul className='row header mx-0'>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/home" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>Home</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/what" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>What</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/how" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>How</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/why" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>Why</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/doula" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={checkActive}>Find a Doula</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink to="/reported" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}>Reported Content</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
        </ul>
    )

    return (
        <nav>
            <div className='banner' onClick={() => props.navigate('/home')}>
                <img src='/media/doula/safehandsdoulabanner.png' alt='siteLogo'/>
            </div>
            {props.auth ? props.isDoula ? props.isSuperUser ? adminUser : doulaUser : user : visitor}
        </nav>
    )
}

export default Header
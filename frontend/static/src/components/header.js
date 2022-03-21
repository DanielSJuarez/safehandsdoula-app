import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { NavLink, Link } from 'react-router-dom';
import { base_URL } from '../config/settings';

function Header(props) {
    const [menuSelected, setMenuSelected] = useState(false)
    const checkActive = () => {
        if (props.isSummary === true) {
            props.setIsSummary(false)
        }
        setMenuSelected(false)
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
        setMenuSelected(false)
        props.setPreview('/media/doula/download.jpeg')
        props.navigate('/home');
        setMenuSelected(false)

    }

    const menuSelect = (
        <ul className='row header mx-0'>
            <li className='col-12'>
                <button className='logout' type='button' name='menu' onClick={() => setMenuSelected(true)}>Menu</button>
            </li>
        </ul>
    )

    const user = (
        <ul className='row header mx-0'>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/home" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>Home</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/what" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>What</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/how" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>How</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/why" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>Why</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/doula" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={checkActive}>Find a Doula</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
        </ul>
    )

    const doulaUser = (
        <ul className='row header mx-0'>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/home" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>Home</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/what" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>What</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/how" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>How</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/why" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>Why</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/doula" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={checkActive}> Find a Doula</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/profile" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>Profile</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
            <div className='headImgHolder' onClick={() => props.navigate('/profile')}>
                <img src={props.profileImg} alt='profile image' className='headImg' />
            </div>
        </ul>
    )

    const visitor = (
        <ul className='row header mx-0'>
            <li className='col-sm-12 col-lg  mx-0'>
                <NavLink to="/home" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>Home</NavLink>
            </li>
            <li className='col-sm-12 col-lg  mx-0'>
                <NavLink to="/what" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>What</NavLink>
            </li>
            <li className='col-sm-12 col-lg  mx-0'>
                <NavLink to="/how" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }}onClick={() => setMenuSelected(false)} >How</NavLink>

            </li>
            <li className='col-sm-12 col-lg  mx-0'>
                <NavLink to="/why" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>Why</NavLink>
            </li>
            <li className='col-sm-12 col-lg  mx-0'>
                <NavLink to="/doula" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={checkActive}>Find a Doula</NavLink>
            </li>
            <li className='col-sm-12 col-lg  mx-0'>
                <Link className='navLinks' to='/login'>Login</Link>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <Link className='navLinks' to='/register'>Create Account</Link>
            </li>
        </ul>
    )

    const adminUser = (
        <ul className='row header mx-0'>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/home" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>Home</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/what" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>What</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/how" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>How</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/why" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>Why</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/doula" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={checkActive}>Find a Doula</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <NavLink to="/reported" className='navLinks' style={({ isActive }) => isActive ? { background: '#b2481b', } : { background: '#57394a' }} onClick={() => setMenuSelected(false)}>Reported Content</NavLink>
            </li>
            <li className='col-sm-12 col-lg mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
        </ul>
    )

    return (
        <nav>
             <div className='logo' onClick={() => props.navigate('/home')}>
                <img src='/media/doula/newsafehandsdoulalogo.png' alt='siteLogo'/>
            </div>
            <div className='banner' onClick={() => props.navigate('/home')}>
                <img src='/media/doula/safehandsdoulabanner.png' alt='siteBanner'/>
            </div>
            <div className='mobile'>
                {menuSelected ? props.auth ? props.isDoula ? props.isSuperUser ? adminUser : doulaUser : user : visitor : menuSelect}
            </div>
            <div className='desktop'>
            {props.auth ? props.isDoula ? props.isSuperUser ? adminUser : doulaUser : user : visitor}
            </div>
        </nav>
    )
}

export default Header
import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { NavLink, Link } from 'react-router-dom';

function Header(props) {

    const checkActive = () => {
        if (props.isSummary === true) {
            props.setIsSummary(false)
            console.log('asfasdfs')
        }
    }

    useEffect(() => {
        const isDoula = async () => {
            const response = await fetch('/api/v1/accounts/doula/').catch(props.handleError);
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
        if (props.auth){
            isDoula();
        }
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
            props.handleError
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
                <NavLink className='navLinks' to='/yourplan'>Why</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/doula'>Doula's</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <button className='logout' type='button' name='logout'  onClick={handleLogout}>Sign Out</button>
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
                <NavLink className='navLinks' to='/yourplan'>Why</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/profile'>Profile</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/doula' onClick={checkActive}>Doula's</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
                <div className='headImgHolder' onClick={() => props.navigate('/profile')}>
                    <img src={props.profileImg} alt='profile image' className='headImg'/>
                </div>
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
                <NavLink className='navLinks' to='/yourplan'>Why</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/doula'>Doula's</NavLink>
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
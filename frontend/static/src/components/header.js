import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { NavLink, Link } from 'react-router-dom';

function Header(props) {

    useEffect(() => {
        const isDoula = async () => {
            const response = await fetch('/api/v1/accounts/doula/').catch(props.handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                // console.log(data)
                if (data[0].is_doula === true) {
                    props.setIsDoula(true)
                    // console.log(data[0].image)
                    props.setProfileImg(data[0].image)
                }
            }
        }
        if (props.auth){
            // console.log(props.auth)
            isDoula();
        }
        // isDoula();
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
                <NavLink className='navLinks' to='/yourplan'>Why</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/profile'>Profile</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/doula'>Doula's</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
            {/* <li className='col mx-0' onClick={() => props.navigate('/profile')}> */}
                <div className='headImgHolder'>
                    <img src={props.profileImg} alt='profile image' className='headImg'/>
                </div>
            {/* </li> */}
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
import { useEffect, useState } from 'react';
import './Header.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [profile, setlocalProfile] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('jwttoken');
        if (!token) {
            alert('Please Login to access personalized Dashboard!')
            navigate('/login')
        } else {
            const decoded = jwtDecode(token);
            const { email } = decoded;
            setlocalProfile(email[0].toUpperCase())
        }

    }, [])

    const onLogout = () => {
        localStorage.clear()
        Cookies.remove('jwttoken')
        navigate('/login')
    }

    return (
        <div className='bg-header-cont'>
            <h1 className='logo'>Acme Corp</h1>
            <div className='logo-cont'>
                <button className='logout' type="button" onClick={onLogout}>Logout</button>
                <div className='cont-profle'>
                    <h1 className='pro'>{profile}</h1>
                </div>
            </div>
        </div>
    )
}

export default Header
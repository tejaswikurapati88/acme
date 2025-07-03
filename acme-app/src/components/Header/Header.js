import { useEffect, useState } from 'react';
import './Header.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
    const [profile, setlocalProfile] = useState('')
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);

    const closePopup = () => {
        setIsOpen(false)
        navigate('/login')

    };

    useEffect(() => {
        const token = Cookies.get('jwttoken');
        if (!token) {
            console.log('isOpen: ', isOpen)
            setIsOpen(true)
        } else {
            const decoded = jwtDecode(token);
            const { email } = decoded;
            setlocalProfile(email[0].toUpperCase())
        }

    }, [isOpen])

    const onLogout = () => {
        localStorage.clear()
        Cookies.remove('jwttoken')
        navigate('/login')
    }

    return (
        <div className='bg-header-cont'>
            <Link to="/" className='link'>
                <h1 className='logo'>Acme Corp</h1>
            </Link>
            <div className='logo-cont'>
                <button className='logout' type="button" onClick={onLogout}>Logout</button>
                <div className='cont-profle'>
                    <h1 className='pro'>{profile}</h1>
                </div>
            </div>
            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2 className='pop-heading'>Login</h2>
                        <p className='pop-p'>Login for your personalised Dashboard</p>
                        <button className='pop-btn' onClick={closePopup}>Login</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header
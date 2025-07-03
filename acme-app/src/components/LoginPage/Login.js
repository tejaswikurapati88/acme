import { useState } from 'react'
import './Login.css'
import loginlogo from './../../access/loginlogo.svg'
import { API_base_url } from '../config'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import ClipLoader from "react-spinners/ClipLoader";


const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState('')
    const [isLoading, setisLoading] = useState(false)

    const navigate = useNavigate()

    const onlogin = async (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
            seterror("*enter all details")
        } else {
            seterror("")
            const userdetails = {
                'email': email,
                'password': password
            }
            const url = `${API_base_url}/users/signin`
            setisLoading(true)
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userdetails)
            })

            if (response.status === 200) {
                const { jwtToken } = await response.json()
                Cookies.set("jwttoken", jwtToken, { expires: 7 })
                navigate('/')
            } else if (response.status === 401) {
                seterror("*enter correct password!")
            } else if (response.status === 404) {
                seterror("*Invalid User. Please SignUp!")
            }
            setisLoading(false)
        }
    }

    return (
        <div className='bg-cont-login'>
            <img src={loginlogo} alt='loginimg' className='loginimg' />
            <div className='login-cont'>
                <h1 className='compname'>ACME Corp</h1>
                <h2 className='greencolor'>Login</h2>
                <form className='formlogin' onSubmit={onlogin} >
                    <div className='inp-cont'>
                        <label htmlFor='username' className='label'>Username / email*</label>
                        <input
                            id='username'
                            className='inp'
                            value={email}
                            onChange={(event) => { setemail(event.target.value) }}
                            type='text'
                            placeholder='Enter your Username' />
                    </div>

                    <div className='inp-cont'>
                        <label htmlFor='password' className='label'>Password*</label>
                        <input
                            id='password'
                            className='inp'
                            value={password}
                            onChange={(event) => { setpassword(event.target.value) }}
                            type='password'
                            placeholder='Enter your Password' />
                    </div>

                    <button type='submit' className='logbtn'>Login</button>
                    {error !== "" && <p className='error'>{error}</p>}
                    <p className='small-btn' onClick={() => { navigate('/register') }}>Register</p>
                    {isLoading &&
                        <div className="loader-overlay">
                            <ClipLoader
                                color="#3498db"
                                size={40}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default Login
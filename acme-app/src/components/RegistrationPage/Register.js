import { useState } from 'react'
import './Register.css'
import loginlogo from './../../access/loginlogo.svg'
import { API_base_url } from '../config'
import {useNavigate} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [conpassword, setconpassword] = useState('')
    const [error, seterror] = useState('')
    const [isLoading, setisLoading] = useState(false)

    const navigate= useNavigate()

    const onRegister = async (event) => {
        event.preventDefault()
        if (conpassword !== password) {
            seterror("*passwords should match!")
        } else {
            seterror('')
            const userdetails= {
                'email': email,
                'password': password
            }

            const url = `${API_base_url}/users/register`
            setisLoading(true)
            const response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userdetails)
            })
            if (response.status === 400){
                seterror("*user already exists.")
            }else if(response.status === 401){
                seterror("*enter all details.")
            }
            else if (response.status === 200) {
                alert("Registered Succesfully!, Please Login")
                navigate('/login')
            }
            setisLoading(false)
        }
    }

    return (
        <div className='bg-cont-login'>
            <img src={loginlogo} alt='loginimg' className='loginimg' />
            <div className='login-cont'>
                <h1 className='compname'>ACME Corp</h1>
                <h2 className='greencolor'>Register</h2>
                <form className='formreg' onSubmit={onRegister} >
                    <div className='inp-cont'>
                        <label htmlFor='email' className='label'>email*</label>
                        <input
                            id='email'
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
                    <div className='inp-cont'>
                        <label htmlFor='conpassword' className='label'>Confirm Password*</label>
                        <input
                            id='conpassword'
                            className='inp'
                            value={conpassword}
                            onChange={(event) => { setconpassword(event.target.value) }}
                            type='password'
                            placeholder='Enter your Password' />
                    </div>

                    <button type='submit' className='logbtn'>Register</button>
                    {error!=="" && <p className='error'>{error}</p>}
                    <p className='small-btn' onClick={() => navigate('/login')}>Login</p>
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

export default Register
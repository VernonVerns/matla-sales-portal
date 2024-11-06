import React from 'react'
import { Link } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import MatlaLogo from '../assets/img/matla-services-logo.png'

const Login = () => {
  return (
    <div id='login_page'>
        <div className='form-side'>
            <div className='header-part'>
                <img src={MatlaLogo} alt="Matla Logo" />
            </div>
            <form action="">
                <div className="form-header">
                    <span><LoginIcon /></span>
                    <h4>Welcome back to Matla Sales</h4>
                    <p>Enter your email and password to continue.</p>
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id='email' placeholder='Enter your email' />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="email" name="email" id='email' placeholder='Enter password' />
                </div>
                <p className='forgot-password'><Link to="">Forgot Password</Link></p>   
                <button type='submit' className='sign-btn'>Sign In</button>
            </form>
            <div className='footer-part'>
                <p>&copy; 2024 Absa AI. All rights reserved.</p>
                <div className='terms-links'>
                    <a href="http://" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
                </div>
            </div>
        </div>
        <div className='image-side'></div>
    </div>
  )
}

export default Login
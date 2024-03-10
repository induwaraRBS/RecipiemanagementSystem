import React from 'react'
import Register from '../components/auth-components/register'
import Login from '../components/auth-components/login'
import "./userauth.css"
const userauth = () => {
  return (
    <div className='User-home'>
        <Login/>
        <Register/>
    </div>
  )
}

export default userauth

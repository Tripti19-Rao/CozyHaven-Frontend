import React from 'react'
import {Link} from 'react-router-dom'

function LandingPage() {
  return (
    <div>
        <h1>CozyHaven Landing Page</h1>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
        <Link to='/nav'>Navbar</Link>
    </div>
  )
}

export default LandingPage
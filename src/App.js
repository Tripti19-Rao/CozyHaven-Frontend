import './App.css';
import {Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import LandingPage from './components/Auth/LandingPage';
import Search from './components/Finder/Search';
import Dashboard from './components/Admin/Dashboard'
import Home from './components/Owner/Home'
// import Search from './components/Search/Search'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App

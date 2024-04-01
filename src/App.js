import './App.css';
import {Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import LandingPage from './components/Auth/LandingPage';
import Search from './components/Finder/Search';
import Navbar from './components/NavBar';
import WishList from './components/Finder/WishList';
import Profile from './components/Finder/Profile';
import PaymentHistory from './components/Finder/PaymentHistory';
// import Search from './components/Search/Search'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path='/nav' element={<Navbar/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/paymentHistory' element={<PaymentHistory/>}/>
      </Routes>
    </div>
  )
}

export default App

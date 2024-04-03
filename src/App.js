import './App.css';
import { useReducer } from 'react'
import {Routes, Route } from 'react-router-dom'
import buildingsReducer from './Reducer/buildingsReducer';
import BuildingContext from './ContextApi/BuildingContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import LandingPage from './components/Auth/LandingPage';
import Search from './components/Finder/Search';
import Navbar from './components/NavBar';
import WishList from './components/Finder/WishList';
import Profile from './components/Finder/Profile';
import PaymentHistory from './components/Finder/PaymentHistory';
import Dashboard from './components/Admin/Dashboard'
import Home from './components/Owner/Home'
import NotFound from './components/NotFound';
import HomeDisplay from './components/Owner/HomeDisplay'
import BuildingForm from './components/Owner/BuildingForm';
// import Search from './components/Search/Search'

function App() {
  const buildingsInitialState = {
    data:[],
    formData:{
      ownerId:'',
      profilePic:'',
      name:'',
      gender:'',
      address:'',
      contact:'',
      deposit:'',
      amenities:'',
      amenitiesPic:'',
      rules:'',
      license:'',
      geolocation:''
    },
    serverError:[]
 }
 const [buildings, buildingsDispatch] = useReducer(buildingsReducer, buildingsInitialState)

  return (
    <div>
      <BuildingContext.Provider value={{buildings, buildingsDispatch}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path='/nav' element={<Navbar/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/paymentHistory' element={<PaymentHistory/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/notfound" element={<NotFound/>}/>
        <Route path="/display" element={<HomeDisplay/>}/>
        <Route path="/form" element={<BuildingForm/>}/>
      </Routes>
      </BuildingContext.Provider>
    </div>
  )
}

export default App

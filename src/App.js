import './App.css';
import { useReducer } from 'react';
import {Routes, Route } from 'react-router-dom'
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
import SearchResults from './components/Finder/SearchResults';
import BuildingForm from './components/Owner/BuildingForm';
import ViewBuildingForm from './components/Owner/ViewBuildingForm'
import Rooms from './components/Owner/Rooms'
import ShowBuilding from './components/Finder/ShowBuilding';
import BookingDetails from './components/Finder/BookingDetails';
import PaymentSuccess from './components/Finder/Payment/PaymentSuccess';
import PaymentCancel from './components/Finder/Payment/PaymentCancel'
import GuestForm from './components/Finder/GuestForm';
//import SearchResults from './components/Finder/SearchResults';

//Reducers
import searchResultsReducer from './Reducer/searchResultsReducers';
import findersReducer from './Reducer/findersReducer';
import buildingsReducer from './Reducer/buildingsReducer';


//ContextApi
import SearchContext from './ContextApi/searchContext';
import FinderContext from './ContextApi/FinderContext';
import BuildingContext from './ContextApi/BuildingContext';
import roomsReducer from './Reducer/roomsReducer';
import RoomContext from './ContextApi/RoomContext';




function App() {

  //initial data
  const searchInitialState = {
    data: [], //JSON.parse(localStorage.getItem('searchResults')) || 
    building: JSON.parse(localStorage.getItem('building')) || {},
    geoapifyResult: JSON.parse(localStorage.getItem('center')) || [],
    isSearched: false
  }

  const buildingsInitialState = {
    data:JSON.parse(localStorage.getItem('buildings')) || [],
    amenities:JSON.parse(localStorage.getItem('amenities')) || [],
    serverError:[]
 }

  const roomsInitialState = {
    data: [],
    clientErrors: {},
    serverError: ''
  }
  //State
  const [searchResults, searchDispatch] = useReducer(searchResultsReducer, searchInitialState)
  const [finder, findersDispatch] = useReducer(findersReducer, {data: JSON.parse(localStorage.getItem('finderData')) || {}})
  const [buildings, buildingsDispatch] = useReducer(buildingsReducer, buildingsInitialState)
  const [rooms, roomsDispatch] = useReducer(roomsReducer, roomsInitialState)
  console.log('App', rooms)

  return (
    <div>
      <BuildingContext.Provider value={{buildings, buildingsDispatch}}>
      <FinderContext.Provider value={{finder, findersDispatch}}>
      <SearchContext.Provider value={{searchResults, searchDispatch}}>
      <RoomContext.Provider value={{rooms, roomsDispatch}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path='/search-results' element={<SearchResults/>}/>
        <Route path='/show-building/:id' element={<ShowBuilding/>}/>
        <Route path='/nav' element={<Navbar/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/paymentHistory' element={<PaymentHistory/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/notfound" element={<NotFound/>}/>
        <Route path="/form" element={<BuildingForm/>}/>
        <Route path="/view-building/:id" element={<ViewBuildingForm />} />
        <Route path="/view-rooms/:id" element={<Rooms />} />
        <Route path="/booking-details/:bookingid" element={<BookingDetails/>} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentCancel />} />
        <Route path='/guest-form' element={<GuestForm/>} />
      </Routes>
      </RoomContext.Provider>
      </SearchContext.Provider>
      </FinderContext.Provider>
      </BuildingContext.Provider>
    </div>
  )
}

export default App

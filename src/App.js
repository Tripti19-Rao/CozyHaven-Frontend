import './App.css';
import { useReducer, useEffect } from 'react';
import axios from 'axios'
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
import SearchResults from './components/Finder/SearchResults';
import BuildingForm from './components/Owner/BuildingForm';
import ViewBuildingForm from './components/Owner/ViewBuildingForm'
import Rooms from './components/Owner/Rooms'
import ShowBuilding from './components/Finder/ShowBuilding';
import BookingDetails from './components/Finder/BookingDetails';
import PaymentSuccess from './components/Finder/Payment/PaymentSuccess';
import PaymentCancel from './components/Finder/Payment/PaymentCancel'
import GuestForm from './components/Finder/GuestForm';
import UnauthorizedPage from './components/Auth/UnauthorizedPage';
import GuestManagement from './components/Owner/GuestManagement'
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

import {jwtDecode} from 'jwt-decode'
import { useDispatch} from 'react-redux';
import { setUserAccount } from './Actions/UserActions';
import PrivateRoutes from './components/Auth/PrivateRoutes';


function App() {

  //initial data
  const searchInitialState = {
    data: [], 
    pagination: [],
    amenities: [],
    initialSearch: false,
    building: JSON.parse(localStorage.getItem('building')) || {},
    geoapifyResult: JSON.parse(localStorage.getItem('center')) || [],
  }

  const buildingsInitialState = {
    data: null,
    amenities:[],
    serverError:''
 }

  const roomsInitialState = {
    data: [],
    clientErrors: {},
    serverError: ''
  }

  const finderInitalState = {
    data:{},
    wishlist:{}
  }
  //State
  const [searchResults, searchDispatch] = useReducer(searchResultsReducer, searchInitialState)
  const [finder, findersDispatch] = useReducer(findersReducer,finderInitalState )
  const [buildings, buildingsDispatch] = useReducer(buildingsReducer, buildingsInitialState)
  const [rooms, roomsDispatch] = useReducer(roomsReducer, roomsInitialState)

  // const user = useSelector((state)=>{
  //   return state.user.userData
  // })
  const usersDispatch = useDispatch()


  useEffect(()=> {
    const token = localStorage.getItem('token')
    if(token) {
      (async function(){
        try {
          const {role} = jwtDecode(token)
          const tokenHeader = {
            headers: {
              Authorization: token
            }
          }
          //get user account
          const response = await axios.get('http://localhost:3055/api/users/account',tokenHeader)
          usersDispatch(setUserAccount(response.data));
          //fetching data based on role
          if(role === 'finder') {
            const response = await axios.get('http://localhost:3055/api/finders/findOne',tokenHeader)
            findersDispatch({type: 'SET_FINDER', payload: response.data});
          }
          else if(role === 'owner'){
            const buildingResponse = await axios.get("http://localhost:3055/api/buildings",tokenHeader)
            buildingsDispatch({ type: "SET_BUILDINGS", payload: buildingResponse.data });

            const ameneitiesResponse = await axios.get('http://localhost:3055/api/amenities',tokenHeader)
            buildingsDispatch({ type: "SET_AMENITIES", payload: ameneitiesResponse.data });
          }
        } catch(err) {
          console.log(err)
        }
      })();
    }
    // eslint-disable-next-line
  },[])


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
        <Route path="/search" element={
          <PrivateRoutes permittedRoles={['finder']}>
            <Search/>
          </PrivateRoutes>
          }/>
        <Route path='/search-results' element={
          <PrivateRoutes permittedRoles={['finder']}>
          <SearchResults/>
        </PrivateRoutes>
        }/>
        <Route path='/show-building/:id' element={
          <PrivateRoutes permittedRoles={['finder']}>
              <ShowBuilding/>
            </PrivateRoutes>
        }/>
        <Route path='/nav' element={<Navbar/>}/>
        <Route path='/wishlist' element={
            <PrivateRoutes permittedRoles={['finder']}>
              <WishList/>
            </PrivateRoutes>
        }/>
        <Route path='/profile' element={
          <PrivateRoutes permittedRoles={['finder']}>
          <Profile/>
        </PrivateRoutes>
        }/>
        <Route path='/paymentHistory' element={
          <PrivateRoutes permittedRoles={['finder']}>
          <PaymentHistory/>
        </PrivateRoutes>
        }/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/home" element={
          <PrivateRoutes permittedRoles={['owner']}>
          <Home/>
        </PrivateRoutes>
        }/>
        <Route path="/form" element={
          <PrivateRoutes permittedRoles={['owner']}>
          <BuildingForm/>
        </PrivateRoutes>
        }/>
        <Route path="/view-building/:id" element={
          <PrivateRoutes permittedRoles={['owner']}>
          <ViewBuildingForm />
        </PrivateRoutes>
        } />
        <Route path="/view-rooms/:id" element={
          <PrivateRoutes permittedRoles={['owner']}>
          <Rooms />
        </PrivateRoutes>
        } />
        <Route path="/manage-guest/:id" element={
          <PrivateRoutes permittedRoles={['owner']}>
          <GuestManagement />
        </PrivateRoutes>
        } />
        <Route path="/booking-details/:bookingid" element={
          <PrivateRoutes permittedRoles={['finder']}>
           <BookingDetails/>
        </PrivateRoutes>
       } />
        <Route path="/success" element={
          <PaymentSuccess />
      //     <PrivateRoutes permittedRoles={['finder']}>
      //     <PaymentSuccess />
      //  </PrivateRoutes>
        
        } />
        <Route path="/cancel" element={
          <PrivateRoutes permittedRoles={['finder']}>
          <PaymentCancel />
       </PrivateRoutes>
        } />
        <Route path='/guest-form/:buildingid' element={
          <PrivateRoutes permittedRoles={['finder']}>
          <GuestForm/>
       </PrivateRoutes>
        } />
        <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
      </Routes>
      </RoomContext.Provider>
      </SearchContext.Provider>
      </FinderContext.Provider>
      </BuildingContext.Provider>
    </div>
  )
}

export default App

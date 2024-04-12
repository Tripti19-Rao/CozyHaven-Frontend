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
//import SearchResults from './components/Finder/SearchResults';

//Reducers
import searchResultsReducer from './Reducer/searchResultsReducers';
import findersReducer from './Reducer/findersReducer';
import buildingsReducer from './Reducer/buildingsReducer';


//ContextApi
import SearchContext from './ContextApi/searchContext';
import FinderContext from './ContextApi/FinderContext';
import BuildingContext from './ContextApi/BuildingContext';




function App() {
  const [searchResults, searchDispatch] = useReducer(searchResultsReducer, {data: [],geoapifyResult: [], isSearched: false})
  const [finder, findersDispatch] = useReducer(findersReducer, {data: JSON.parse(localStorage.getItem('finderData')) || {}})

  const buildingsInitialState = {
    data:JSON.parse(localStorage.getItem('buildings')) || [],
    amenities:JSON.parse(localStorage.getItem('amenities')) || [],
    serverError:[]
 }
 const [buildings, buildingsDispatch] = useReducer(buildingsReducer, buildingsInitialState)

  return (
    <div>
      <BuildingContext.Provider value={{buildings, buildingsDispatch}}>
      <FinderContext.Provider value={{finder, findersDispatch}}>
      <SearchContext.Provider value={{searchResults, searchDispatch}}>

      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path='/search-results' element={<SearchResults/>}/>
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
      </Routes>
      </SearchContext.Provider>
      </FinderContext.Provider>
      </BuildingContext.Provider>
    </div>
  )
}

export default App

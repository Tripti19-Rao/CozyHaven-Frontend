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
import SearchResults from './components/Finder/SearchResults';

import searchResultsReducer from './Reducer/searchResultsReducers';
import SearchContext from './ContextApi/searchContext';


function App() {
  const [searchResults, searchDispatch] = useReducer(searchResultsReducer, {data: [],geoapifyResult: []})

  return (
    <div>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/search" element={<SearchContext.Provider value={{searchResults, searchDispatch}}><Search/></SearchContext.Provider>}/>
        <Route path='/search-results' element={<SearchContext.Provider value={{searchResults, searchDispatch}}><SearchResults/></SearchContext.Provider>}/>
        <Route path='/nav' element={<Navbar/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/paymentHistory' element={<PaymentHistory/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App

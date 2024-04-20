import { createStore, combineReducers, applyMiddleware } from 'redux'
import bookingReducer from '../Reducer/bookingReducer'
import guestsReducer from '../Reducer/guestsReducer'
import {thunk} from 'redux-thunk'
import { userReducer } from '../Reducer/userReducer'

const configStore = () =>{
    const store = createStore(combineReducers({ 
        user: userReducer,
        booking:bookingReducer,
        guests: guestsReducer
    }),applyMiddleware(thunk))
    return store
}

export default configStore
import { createStore, combineReducers, applyMiddleware } from 'redux'
import bookingReducer from '../Reducer/bookingReducer'
import {thunk} from 'redux-thunk'

const configStore = () =>{
    const store = createStore(combineReducers({ 
        booking:bookingReducer

    }),applyMiddleware(thunk))
    return store
}

export default configStore
import axios from 'axios'
import {toast} from "react-toastify";

export const startBookingRoom = (data,navigate) =>{
    return async(dispatch)=>{
        try{
            const bookingResponse = await axios.post('http://localhost:3055/api/invoice',data,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            dispatch(addBooking(bookingResponse.data))
            navigate(`/booking-details/${bookingResponse.data._id}`);

        }catch(err){
            toast.error(err.response.data.errors)
        }
    }
}

const addBooking =(bookingDetails)=>{
    return {
        type: 'ADD_BOOKING',
        payload:bookingDetails
    }
}

export const startGetBookingDetails = (id) =>{
    return async(dispatch)=>{
        try{
            const response = await axios.get(`http://localhost:3055/api/invoice/${id}`,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            dispatch(updateBooking(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

const updateBooking = (bookingDeatils) =>{
    return{
        type:'UPDATE_BOOKING',
        payload:bookingDeatils
    }
}

export const startDestroyBooking = (id) =>{
    return async(dispatch)=>{
        try{
            const response = await axios.delete(`http://localhost:3055/api/invoice/${id}`,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            dispatch(deleteBooking())
        }catch(err){
            console.log(err)
        }
    }
}

const deleteBooking = ()=>{
   return{
    type:'RESET_BOOKING'
   }
}

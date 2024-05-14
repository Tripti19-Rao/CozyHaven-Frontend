const initailBooking = {
    bookingDetails:{}
}

const bookingReducer = (state=initailBooking , action)=>{
    switch(action.type){
        case 'ADD_BOOKING':{
            return {...state, bookingDetails: action.payload}
        }
        case 'UPDATE_BOOKING' :{
            return {...state, bookingDetails: action.payload}
        }
        case 'RESET_BOOKING' :{
            return {...state, bookingDetails:{}}
        }
        default:{
            return {...state}
        }
    }
}

export default bookingReducer;
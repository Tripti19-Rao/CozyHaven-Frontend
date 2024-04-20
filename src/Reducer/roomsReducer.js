export default function roomsReducer(state, action) {
    switch(action.type) {
        case 'SET_CLIENTERRORS': {
            return {...state, clientErrors: {...action.payload}}
        }
        case 'ADD_ROOMS': {
            return {...state, data: [...state.data, action.payload]}
        }
        case 'SET_ROOMS': {
            return {...state, data: [...action.payload]}
        }
        case 'UPDATE_ROOMS': {
            return {...state, data: state.data.map(ele => {
                if(ele._id === action.payload._id){
                    return {...action.payload}
                } else {
                    return ele
                }
            })}
        }
        case 'DELETE_ROOM': {
            return {...state, data: state.data.filter(ele => {
                return ele._id !== action.payload
            })}
        }
        case 'SET_SERVERERRORS': {
            return {...state, serverErrors: action.payload}
        }
        default: return {...state}
    }
}
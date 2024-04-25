export default function findersReducer(state, action) {
    switch(action.type) {
        case 'SET_FINDER': {
            return {...state, data: {...action.payload}}
        }
        case 'SET_WISHLIST':{
            return {...state, wishlist:action.payload}
        }
        case 'UPDATE_WISHLIST':{
            return {...state, wishlist:action.payload}
        }
        default: return  {...state}
    }
}
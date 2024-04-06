export default function buildingsReducer ( state, action )  {
    switch(action.type){
        case 'SET_BUILDINGS':{
            return {...state , data:action.payload}
        }
        case 'SET_AMENITIES':{
            return {...state, amenities:action.payload}
        }
        case 'ADD_BUILDING':{
            return {...state , data:[...state.data , action.payload]}
        }
        default:{
            return {...state}
        }
    }
}

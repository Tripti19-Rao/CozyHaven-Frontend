export default function buildingsReducer ( state, action )  {
    switch(action.type){
        case 'SET_BUILDINGS':{
            return {...state , data:action.payload}
        }
        case 'SET_AMENITIES':{
            return {...state, amenities:action.payload}
        }
        default:{
            return {...state}
        }
    }
}

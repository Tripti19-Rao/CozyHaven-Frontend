export default function adminReducer ( state, action ){
    switch(action.type){
        case 'SET_USERS':{
            return {...state, users:action.payload}
        }
        case 'SET_BUILDINGS':{
            return {...state, buildings:action.payload}
        }
        case 'SET_Pending_BUILDINGS': {
            return {...state, pendingBuildings: action.payload}
        }
        case 'REMOVE_PENDING_BUILDING': {
            return {
                ...state, pendingBuildings: state.pendingBuildings.filter(ele => {
                    return ele._id !== action.payload._id
                }),
                buildings: state.buildings.map(ele => {
                    if(ele._id === action.payload._id) {
                        return {...action.payload}
                    } else {
                        return ele
                    }
                })
            }
        }
        default:{
            return {...state}
        }
    }
}


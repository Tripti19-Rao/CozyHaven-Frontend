export default function adminReducer ( state, action ){
    switch(action.type){
        case 'SET_USERS':{
            return {...state, users:action.payload}
        }
        case 'SET_BUILDINGS':{
            return {...state, buildings:action.payload}
        }
        default:{
            return {...state}
        }
    }
}


const usersInitialState = {
    userData: null 
}

export function userReducer(state = usersInitialState, action) {
    switch(action.type) {
        case 'HANDLE_LOGGIN': {
            return {...state, userData: {...action.payload}}
        }
        case 'HANDLE_LOGOUT': {
            return {...state, userData: null}
        }
        default: return {...state}
    }
}
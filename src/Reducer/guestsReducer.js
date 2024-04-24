const initialGuestState = {
    data: {},
    serverErrors:''
}

export default function guestsReducer(state = initialGuestState,action) {
    switch(action.type) {
        case 'SET_GUESTS' :{
            return {...state, data: action.payload}
        }
        case 'REMOVE_GUEST' :{
            return {...state, data:{...state.data, data:state.data.data.filter(ele=>{return ele._id !==action.payload._id})}}
        }
        case 'SET_SERVERERROR' :{
            return {...state , serverErrors:action.payload}
        }
        default: return {...state}
    }
}
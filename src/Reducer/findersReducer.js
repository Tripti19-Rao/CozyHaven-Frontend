export default function findersReducer(state, action) {
    switch(action.type) {
        case 'SET_FINDER': {
            return {...state, data: {...action.payload}}
        }
        default: return  {...state}
    }
}
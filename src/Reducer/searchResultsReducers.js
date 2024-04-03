export default function searchResultsReducer(state, action) {
    switch(action.type) {
        case 'SET_BUILDINGS': {
            return {...state, data: [...action.payload]}
        }
        case 'SET_GEOAPIFY': {
            return {...state, geoapifyResult: [...action.payload]}
        }
        default : {
            return {...state}
        }
    }
}
export default function searchResultsReducer(state, action) {
    switch(action.type) {
        case 'SET_BUILDINGS': {
            return {...state, 
                data: [...action.payload.buildings],
                pagination: {...action.payload.pagination}
            }
        }
        case 'SET_INITIALSEARCH': {
            return {
                ...state,
                initialSearch: action.payload
            }
        }
        case 'SET_GEOAPIFY': {
            return {...state, geoapifyResult: [...action.payload]}
        }
        case 'SET_ISCLICKED': {
            return {...state, isClicked: [...action.payload]}
        }
        case 'SET_BUILDING': {
            return {...state, building: {...action.payload}}
        }
        case 'SET_AMENITIES':{
            return {...state, amenities:action.payload}
        }
        case 'SET_REVIEWS':{
            return {...state, reviews:action.payload}
        }
        case 'UPDATE_REVIEW':{
            return {...state, reviews:[action.payload, ...state.reviews]}
        }
        default : {
            return {...state}
        }
    }
}
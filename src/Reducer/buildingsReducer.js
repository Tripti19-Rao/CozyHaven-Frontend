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
        case 'EDIT_BUILDING':{
            return {...state , data:state.data.map((ele)=>{
                if(ele._id===action.payload._id){
                    return action.payload
                }
                else{
                    return ele
                }
            })}
        }
        case 'SET_REVIEWS':{
            return{...state, reviews:action.payload}
        }
        case 'SET_SERVERERROR' :{
            return {...state , serverErrors:action.payload}
        }
        default:{
            return {...state}
        }
    }
}

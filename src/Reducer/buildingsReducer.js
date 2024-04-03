export default function buildingsReducer ( state, action )  {
    switch(action.type){
        case 'SET_BUILDINGS':{
            return {...state , data:action.payload}
        }
        default:{
            return {...state}
        }
    }
}

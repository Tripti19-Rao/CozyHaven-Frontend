const initialGuestState = {
    data: []
}

export default function guestsReducer(state = initialGuestState,action) {
    switch(action.type) {
        default: return {...state}
    }
}


const initialState = {
    darkMode: false
}

export default (state=initialState, action) => {
    switch(action.type){
        case "DARKMODE":
            localStorage.setItem('darkmode', !state.darkMode)
            state = {
                ...action,
                darkMode: !state.darkMode
            }
            break;
        case "CHECKDARKMODE":
            state = {
                ...state,
                darkMode: action.payload.darkMode
            }
            break;
    }   

    return state
}



const initialState = {
    sidebar: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case "CLOSEBUTTON":
            state = {
                ...state,
                sidebar: !state.sidebar
            }
    }
    return state
}
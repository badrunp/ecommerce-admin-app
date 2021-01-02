import store from '../store';

export const onDarkMode = () => {

    return async (dispatch) => {
        dispatch({type: "DARKMODE"})
    }

}

export const checkDarkMode = () => {

    return async (dispatch) => {
        
        const darkMode = JSON.parse(localStorage.getItem('darkmode'))
        if(darkMode){
            dispatch({
                type: "CHECKDARKMODE",
                payload: {
                    darkMode: darkMode
                }
            })
        }

    }

}
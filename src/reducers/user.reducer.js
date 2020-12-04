import { userConstant } from "../configs/constant"

const initialState = {
    error: "",
    message: "",
    loading: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case userConstant.REGISTER_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case userConstant.REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: ""
            }
            break;
        case userConstant.REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                message: "",
                error: action.payload.error
            }
            break;
        case 'TIMEOUTREGISTER':
            state = {
                ...state,
                error: "",
                message: ""
            }
            break;
    }

    return state
}
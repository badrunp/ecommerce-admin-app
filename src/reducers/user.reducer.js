import { userConstant } from "../configs/constant"

const initialState = {
    error: {
        name: [],
        email: [],
        password: []
    },
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
                error: {
                    name: [],
                    email: [],
                    password: []
                }
            }
            break;
        case userConstant.REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                message: "",
                error: {
                    name: action.payload.name,
                    email: action.payload.email,
                    password: action.payload.password
                }
            }
            break;
        case 'TIMEOUTREGISTER':
            state = {
                ...state,
                error: {
                    name: [],
                    email: [],
                    password: []
                },
                message: ""
            }
            break;
    }

    return state
}
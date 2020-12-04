import { loginConstant, logoutConstant } from "../configs/constant"

const initialState = {
    token: null,
    user: {
        fullName: "",
        email: "",
        role: "",
        photo: ""
    },
    authenticate: false,
    authenticating: false,
    message: "",
    error: "",
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case loginConstant.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true,
            }
            break;
        case loginConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                authenticating: false,
                authenticate: true,
                token: action.payload.token,
                user: action.payload.user,
                loading: false,
                error: ""
            }
            break;
        case loginConstant.LOGIN_FAILURE:
            state = {
                ...state,
                loading: false,
                authenticating: false,
                authenticate: false,
                user: {
                    fullName: "",
                    email: "",
                    role: "",
                    photo: ""
                },
                token: null,
                error: action.payload.error
            }
            break;
        case 'TIMEOUTLOGIN':
            state = {
                ...state,
                error: ""
            }
            break;
        case logoutConstant.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case logoutConstant.LOGOUT_SUCCESS:
            state = {
                ...initialState
            }
            break;
        case logoutConstant.LOGOUT_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
        
    }

    return state
}
import { loginConstant, logoutConstant } from "../configs/constant"

const initialState = {
    token: null,
    user: {
        fullName: "",
        email: "",
        role: "",
        image: ""
    },
    authenticate: false,
    authenticating: false,
    message: "",
    error: {
        email: [],
        password: []
    },
    loading: false,
    errorValidasi: null
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
                error: {
                    email: [],
                    password: []
                }
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
                    image: ""
                },
                token: null,
                error: {
                    email: action.payload.email,
                    password: action.payload.password
                }
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
        case loginConstant.UPDATEUSERIMAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case loginConstant.UPDATEUSERIMAGE_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                loading: false
            }
            break;
        case loginConstant.UPDATEUSERIMAGE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case loginConstant.UPDATENAME_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case loginConstant.UPDATENAME_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                loading: false,
                message: action.payload.message
            }
            break;
        case loginConstant.UPDATENAME_FAILURE:
            state = {
                ...state,
                loading: false,
                errorValidasi: action.payload.error
            }
            break;
        case loginConstant.UPDATEPASSWORD_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case loginConstant.UPDATEPASSWORD_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                loading: false,
                message: action.payload.message
            }
            break;
        case loginConstant.UPDATEPASSWORD_FAILURE:
            state = {
                ...state,
                loading: false,
                errorValidasi: action.payload.error
            }
            break;
        case loginConstant.UPDATEUMUR_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case loginConstant.UPDATEUMUR_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                loading: false,
                message: action.payload.message
            }
            break;
        case loginConstant.UPDATEUMUR_FAILURE:
            state = {
                ...state,
                loading: false,
                errorValidasi: action.payload.error
            }
            break;
        case loginConstant.UPDATETANGGALLAHIR_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case loginConstant.UPDATETANGGALLAHIR_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                loading: false,
                message: action.payload.message
            }
            break;
        case loginConstant.UPDATETANGGALLAHIR_FAILURE:
            state = {
                ...state,
                loading: false,
                errorValidasi: action.payload.error
            }
            break;
        case loginConstant.UPDATETELEPON_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case loginConstant.UPDATETELEPON_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                loading: false,
                message: action.payload.message
            }
            break;
        case loginConstant.UPDATETELEPON_FAILURE:
            state = {
                ...state,
                loading: false,
                errorValidasi: action.payload.error
            }
            break;
        case loginConstant.UPDATEALAMAT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case loginConstant.UPDATEALAMAT_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                loading: false,
                message: action.payload.message
            }
            break;
        case loginConstant.UPDATEALAMAT_FAILURE:
            state = {
                ...state,
                loading: false,
                errorValidasi: action.payload.error
            }
            break;
        case "VALIDASITIMEOUTAUTH":
            state = {
                ...state,
                message: "",
                errorValidasi: null
            }

    }

    return state
}
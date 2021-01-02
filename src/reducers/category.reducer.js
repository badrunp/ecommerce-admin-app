import { categoryConstant } from "../configs/constant"

const initialState = {
    error: null,
    message: "",
    categories: [],
    categoryLength: null,
    categoryData: [],
    categoryHistory: [],
    loading: false,
    per_page: null,
    current_page: null,
    updateGrapich: false
    // category_pagination: 1
}


export default (state = initialState, action) => {
    switch (action.type) {
        case categoryConstant.GETALLCATEGORY:
            const cHistory = action.payload.categoryHistory.reverse()
            state = {
                ...state,
                categories: action.payload.categories,
                categoryLength: action.payload.categoryLength,
                categoryData: action.payload.categoryData,
                categoryHistory: cHistory,
                per_page: action.payload.per_page,
                current_page: action.payload.current_page,
                totalPage: action.payload.totalPage
            }
            break;
        // case "CATEGORY_PAGINATION": 
        //     state = {
        //         ...state,
        //         category_pagination: action.payload.number
        //     }
        //     break;
        case categoryConstant.ADDCATEGORY_REQUEST:
            state = {
                ...state,
                error: null,
                loading: true,
            }
            break;
        case categoryConstant.ADDCATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                updateGrapich: true
            }
            break;
        case categoryConstant.ADDCATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        case categoryConstant.DELETECATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
                error: null
            }
            break;
        case categoryConstant.DELETECATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                updateGrapich: true
            }
            break;
        case categoryConstant.DELETECATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: 'ada yang error'
            }
            break;
        case categoryConstant.UPDATECATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
                error: null
            }
            break;
        case categoryConstant.UPDATECATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                updateGrapich: true
            }
            break;
        case categoryConstant.UPDATECATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstant.DELETEALLCATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
                error: null
            }
            break;
        case categoryConstant.DELETEALLCATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                updateGrapich: true
            }
            break;
        case categoryConstant.DELETEALLCATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case "CLOSEMESSAGEVALIDASI":
            state = {
                ...state,
                error: null,
                message: ""
            }
            break;
        case "UPDATEGRAPICH":
            state = {
                ...state,
                updateGrapich: false
            }
            break;
    }

    return state
}
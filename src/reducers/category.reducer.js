import { categoryConstant } from "../configs/constant"

const initialState = {
    error: null,
    message: "",
    categories: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case categoryConstant.GETALLCATEGORY:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
    }

    return state
}
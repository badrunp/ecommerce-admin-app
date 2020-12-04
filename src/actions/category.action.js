import { categoryConstant } from "../configs/constant";
import axiosApi from "../helpers/axios"

export const getAllCategory = () => {
    return async (dispatch) => {
        
        try {
            const res = await axiosApi.get('/category/getcategory');
            console.log(res);
            dispatch({
                type: categoryConstant.GETALLCATEGORY,
                payload:{
                    categories: res.data.category
                }
            })
        } catch (error) {
            console.log(error.response);
        }

    }
}
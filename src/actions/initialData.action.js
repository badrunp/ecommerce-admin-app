
import { categoryConstant } from "../configs/constant";
import axiosApi from "../helpers/axios";

export const initialData = () => {
    return async (dispatch) => {
        try {
            const res = await axiosApi.post('/initialdata');
            dispatch({
                type: categoryConstant.GETALLCATEGORY,
                payload:{
                    categories: res.data.categories,
                    categoryLength: res.data.categoryLength,
                    categoryData: res.data.categoryData,
                    categoryHistory: res.data.categoryHistory
                }
            })
        } catch (error) {
            console.log(error.response);
        }
    }
}
import { categoryConstant } from "../configs/constant";
import axiosApi from "../helpers/axios"
import { initialData } from "./initialData.action";

const getAllCategory = (page, search) => {
    return async (dispatch) => {
        try {
            const res = await axiosApi.post(`/category/getcategory?page=${page || 1}`, search);
            dispatch({
                type: categoryConstant.GETALLCATEGORY,
                payload: {
                    categories: res.data.category,
                    categoryLength: res.data.categoryLength,
                    categoryData: res.data.categoryData,
                    categoryHistory: res.data.categoryHistory,
                    per_page: res.data.per_page,
                    current_page: res.data.current_page,
                    totalPage: res.data.totalPage
                }
            })
        } catch (error) {
            console.log(error.response);
        }

    }
}


// export const getAllCategoryHistory = () => {

//     return async (dispatch) => {
//         try {
//             const res = await axiosApi.get('/category/getcategoryhistory')
//         } catch (error) {
//             console.log(error);
//         }
//     }

// }

export const addCategory = (form) => {
    return async (dispatch) => {

        dispatch({ type: categoryConstant.ADDCATEGORY_REQUEST })
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/category/create', form);
                if (res.status == 200) {
                    // dispatch(initialData())
                    dispatch(getAllCategory())
                    dispatch({
                        type: categoryConstant.ADDCATEGORY_SUCCESS,
                        payload: {
                            message: res.data.message
                        }
                    })
                }
            } catch (error) {
                dispatch({
                    type: categoryConstant.ADDCATEGORY_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                })
            }
        }, 1000)
    }
}


export const deleteCategory = (ids) => {
    return async (dispatch) => {

        dispatch({type: categoryConstant.DELETECATEGORY_REQUEST})
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/category/delete', {
                    payload: {
                        ids
                    }
                })
                if (res.status == 200) {
                    // dispatch(initialData())
                    dispatch(getAllCategory())
                    dispatch({
                        type: categoryConstant.DELETECATEGORY_SUCCESS,
                        payload: {
                            message: res.data.message
                        }
                    })
                }
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: categoryConstant.DELETECATEGORY_FAILURE
                })
            }
        }, 1000)
    }
}

export const updateCategory = (form) => {
    return async (dispatch) => {
        
        dispatch({ type: categoryConstant.UPDATECATEGORY_REQUEST})
        setTimeout( async () => {
            try {
                const res = await axiosApi.post('/category/update', form);
                if(res.status === 200){
                    // dispatch(initialData())
                    dispatch(getAllCategory())
                    dispatch({
                        type: categoryConstant.UPDATECATEGORY_SUCCESS,
                        payload: {
                            message: res.data.message
                        }
                    })
                }
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: categoryConstant.UPDATECATEGORY_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                })
            }
        },1000)

    }
}

export const deleteAllCategory = () => {
    return async (dispatch) => {

        dispatch({type: categoryConstant.DELETEALLCATEGORY_REQUEST})
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/category/deleteall',)
                if (res.status == 200) {
                    // dispatch(initialData())
                    dispatch(getAllCategory())
                    dispatch({
                        type: categoryConstant.DELETEALLCATEGORY_SUCCESS,
                        payload: {
                            message: res.data.message
                        }
                    })
                }
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: categoryConstant.DELETEALLCATEGORY_FAILURE
                })
            }
        }, 1000)
    }
}

export const deleteHistoryCategory = (id) => {
    return async (dispatch) => {
        try {
            const res = await axiosApi.post('/category/deletecategoryhistory', {
                payload:{
                    id
                }
            })
            if(res.status === 200){
                // dispatch(initialData())
                dispatch(getAllCategory())
            }

        } catch (error) {
            console.log(error);
        }
    }
} 


export const closeMessageValidasi = () => {
    return async (dispatch) => {
        dispatch({
            type: "CLOSEMESSAGEVALIDASI"
        })
    }
}

export const updateGrapich = () => {
    return async (dispatch) => {
        dispatch({
            type: "UPDATEGRAPICH"
        })
    }
}


export {
    getAllCategory
}
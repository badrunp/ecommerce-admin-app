import { userConstant } from "../configs/constant";
import axiosApi from "../helpers/axios";


export const register = (user) => {
    return async (dispatch) => {

        dispatch({ type: userConstant.REGISTER_REQUEST })
        setTimeout( async () => {
            try {
                const res = await axiosApi.post('/admin/register', user)
                if (res.status === 200) {
                    dispatch({
                        type: userConstant.REGISTER_SUCCESS,
                        payload: {
                            message: res.data.message
                        }
                    })
                }
            } catch (error) {
                dispatch({
                    type: userConstant.REGISTER_FAILURE,
                    payload: {
                        error: error.response.data.message
                    }
                })
            }
        }, 1000)
    }
}

export const timeOutRegister = () => {
    return async (dispatch) => {

        dispatch({ type: 'TIMEOUTREGISTER' })
    }
}
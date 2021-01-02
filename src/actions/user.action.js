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
                console.log(error.response);
                const {message} = error.response.data;
                const name = message.filter(item => item.param == 'fullName');
                const email = message.filter(item => item.param == 'email');
                const password = message.filter(item => item.param == 'password');
                dispatch({
                    type: userConstant.REGISTER_FAILURE,
                    payload: {
                        name: name,
                        email: email,
                        password: password
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
import { loginConstant, logoutConstant } from "../configs/constant";
import axiosApi from "../helpers/axios"


export const login = (user) => {
    return async (dispatch) => {


        dispatch({ type: loginConstant.LOGIN_REQUEST })
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/admin/login', user);
                if (res.status === 200) {
                    const { token, user } = res.data;
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                    dispatch({
                        type: loginConstant.LOGIN_SUCCESS,
                        payload: {
                            token,
                            user
                        }
                    })
                }

            } catch (error) {
                dispatch({
                    type: loginConstant.LOGIN_FAILURE,
                    payload: {
                        error: error.response.data.message
                    }
                })
            }
        }, 1000)

    }
}

export const timeOutLogin = () => {
    return async (dispatch) => {

        dispatch({ type: 'TIMEOUTLOGIN' })
    }
}

export const userIsLogin = () => {
    return async (dispatch) => {

        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: loginConstant.LOGIN_SUCCESS,
                payload: {
                    user, token
                }
            })
        }

    }
}

export const logout = () => {
    return async (dispatch) => {

        dispatch({ type: logoutConstant.LOGOUT_REQUEST })
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/admin/logout');
                if (res.status === 200) {
                    localStorage.clear();
                    dispatch({
                        type: logoutConstant.LOGOUT_SUCCESS
                    })
                }
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: logoutConstant.LOGOUT_FAILURE
                })
            }
        }, 1000)

    }
}
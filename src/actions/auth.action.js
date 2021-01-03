import { loginConstant, logoutConstant } from "../configs/constant";
import axiosApi from "../helpers/axios"


const login = (user) => {
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
                const { message } = error.response.data;
                const email = message.filter(item => item.param == "email")
                const password = message.filter(item => item.param == 'password')
                dispatch({
                    type: loginConstant.LOGIN_FAILURE,
                    payload: {
                        email: email,
                        password: password
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
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
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

export const updateImage = (image) => {
    return async (dispatch) => {

        dispatch({type: loginConstant.UPDATEUSERIMAGE_REQUEST})
        try {
            const res = await axiosApi.post('/admin/updateimage', image)
            if(res.status == 200){
                localStorage.setItem('user', JSON.stringify(res.data.user))
                dispatch({
                    type: loginConstant.UPDATEUSERIMAGE_SUCCESS,
                    payload:{
                        user: res.data.user
                    }
                })
            }
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: loginConstant.UPDATEUSERIMAGE_FAILURE,
                payload: {
                    error: error.response.data.error
                }
            })
        }

    }
}


export const updateName = (data) => {
    return async (dispatch) => {

        dispatch({type: loginConstant.UPDATENAME_REQUEST})
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/admin/updatename', data)
                if(res.status == 200){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    dispatch({
                        type: loginConstant.UPDATENAME_SUCCESS,
                        payload:{
                            user: res.data.user,
                            message: res.data.message
                        }
                    })
                }
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: loginConstant.UPDATENAME_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                })
            }
        }, 1000)

    }
}

export const updatePassword = (data) => {
    return async (dispatch) => {
        dispatch({type: loginConstant.UPDATEPASSWORD_REQUEST})
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/admin/updatepassword', data)
                if(res.status == 200){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    dispatch({
                        type: loginConstant.UPDATEPASSWORD_SUCCESS,
                        payload:{
                            message: res.data.message,
                            user: res.data.user
                        }
                    })
                }
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: loginConstant.UPDATEPASSWORD_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                })
            }   
        }, 1000)
    }
}

export const updateUmur = (data) => {
    return async (dispatch) => {
        dispatch({type: loginConstant.UPDATEUMUR_REQUEST})
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/admin/updateumur', data)
                if(res.status == 200){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    dispatch({
                        type: loginConstant.UPDATEUMUR_SUCCESS,
                        payload:{
                            message: res.data.message,
                            user: res.data.user
                        }
                    })
                }
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: loginConstant.UPDATEUMUR_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                })
            }   
        }, 1000)
    }
}

export const updateTanggalLahir = (data) => {
    return async (dispatch) => {
        dispatch({type: loginConstant.UPDATETANGGALLAHIR_REQUEST})
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/admin/updatetanggallahir', data)
                if(res.status == 200){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    dispatch({
                        type: loginConstant.UPDATETANGGALLAHIR_SUCCESS,
                        payload:{
                            message: res.data.message,
                            user: res.data.user
                        }
                    })
                }
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: loginConstant.UPDATETANGGALLAHIR_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                })
            }   
        }, 1000)
    }
}

export const updateTelepon = (data) => {
    return async (dispatch) => {
        dispatch({type: loginConstant.UPDATEPASSWORD_REQUEST})
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/admin/updatetelepon', data)
                if(res.status == 200){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    dispatch({
                        type: loginConstant.UPDATETELEPON_SUCCESS,
                        payload:{
                            message: res.data.message,
                            user: res.data.user
                        }
                    })
                }
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: loginConstant.UPDATETELEPON_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                })
            }   
        }, 1000)
    }
}

export const updateAlamat = (data) => {
    return async (dispatch) => {
        dispatch({type: loginConstant.UPDATEPASSWORD_REQUEST})
        setTimeout(async () => {
            try {
                const res = await axiosApi.post('/admin/updatealamat', data)
                if(res.status == 200){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    dispatch({
                        type: loginConstant.UPDATEALAMAT_SUCCESS,
                        payload:{
                            message: res.data.message,
                            user: res.data.user
                        }
                    })
                }
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: loginConstant.UPDATEALAMAT_FAILURE,
                    payload: {
                        error: error.response.data.error
                    }
                })
            }   
        }, 1000)
    }
}


export const closeValidasiMessageAuth = () => {
    return async (dispatch) => {
        dispatch({
            type: "VALIDASITIMEOUTAUTH"
        })
    }
}


export {
    login
}
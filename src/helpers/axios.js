import axios from 'axios';
import { logoutConstant } from '../configs/constant';
import store from '../store'

const token = window.localStorage.getItem('token');

const axiosApi = axios.create({
    baseURL: 'http://localhost:4000/v1/api',
    headers: {
        "Authorization": token ? `Bearer ${token}` : ""
    }
})

axiosApi.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if (auth.token) {
        req.headers.Authorization = `Bearer ${auth.token}`
    }

    return req
})

axiosApi.interceptors.response.use((res) => {
    return res;
}, (error) => {
    const status = error.response ? error.response.status : 500;
    if(status === 500){
        localStorage.clear()
        store.dispatch({
            type: logoutConstant.LOGOUT_SUCCESS
        })
    }
    return Promise.reject(error)
})

export default axiosApi;
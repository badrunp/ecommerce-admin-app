import { chatConstant } from "../configs/constant";
import axiosApi from "../helpers/axios";
import store from '../store';

const getChat = (id) => {
    return async (dispatch) => {
        try {
            // const userId = {
            //     uid: id
            // }
            const res = await axiosApi.post('/chat/getchat')
            
            if(res.status == 200){
                dispatch({
                    type: chatConstant.GETALLCHAT,
                    payload: {
                        chats: res.data.chats,
                        // result: res.data.notificationChat
                    }
                })
            }
        } catch (error) {
            console.log(error.response);
        }
    }
}

const getNotificationChats = (id) => {
    return async (dispatch) => {
        try {
            const userId = {
                uid: id
            }
            const res = await axiosApi.post('/chat/getnotificationchats', userId )
            dispatch({
                type: "GETNOTIFICATIONMESSAGE",
                payload: {
                    result: res.data.result
                }
            })

        } catch (error) {
            console.log(error.response);
        }
    }
}

export const removeNotificationChats = (id) => {
    return async (dispatch) => {
        try {
            const userId = {
                uid: id
            }
            const res = await axiosApi.post('chat/removenotificationchats', userId)
            if(res.status == 200){
                dispatch(getNotificationChats(id))
            }
        } catch (error) {
            console.log(error.response);
        }
    }
}

export const addNotificationChats = (id) => {
    return async (dispatch) => {
        const uid = {
            userId: id
        }
        try {
            const res = await axiosApi.post('/chat/addnotificationchats', uid );
            if(res.status == 200){
                dispatch({
                    type: "ADDNOTIFICATIONMESSAGE",
                    payload: {
                        result: res.data.result
                    }
                })
            }
        } catch (error) {
            console.log(error.response);
        }

    }
}

export const handleShowChat = () => {
    return async (dispatch) => {
        dispatch({
            type: "HANDLESHOWCHAT"
        })
    }
}

export const outputChat = () => {
    return async (dispatch) => {
        const {auth} = store.getState();
        dispatch(getChat())
    }
}



export {
    getChat,
    getNotificationChats
}

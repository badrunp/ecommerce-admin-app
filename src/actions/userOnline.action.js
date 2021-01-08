import { chatConstant } from "../configs/constant";

export const getUserOnline = (data) => {
  return async (dispatch) => {
    console.log(data);
    dispatch({
      type: chatConstant.GETUSERONLINE,
      payload: {
        data: data,
      },
    });
  };
};

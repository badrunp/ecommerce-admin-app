import { chatConstant } from "../configs/constant";

export const getUserOnline = (data) => {
  return async (dispatch) => {
    dispatch({
      type: chatConstant.GETUSERONLINE,
      payload: {
        data: data,
      },
    });
  };
};

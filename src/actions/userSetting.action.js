import { userSettingConstant } from "../configs/constant";
import axiosApi from "../helpers/axios";

export const updateUserSettingHistoryProduct = (bool) => {
  return async (dispatch) => {
    const newBool = {
      bool: bool.toString(),
    };
    try {
      dispatch({
        type: userSettingConstant.USERSETTING_HISTTORYPRODUCT,
        payload: {
          productHistory: bool,
        },
      });
      const res = await axiosApi.post(
        "/usersetting/updateproducthistory",
        newBool
      );
      if (res.status === 200) {
        const { userSetting } = res.data;
        localStorage.setItem("userSetting", JSON.stringify(userSetting));
        dispatch({
          type: userSettingConstant.GETUSERSETTING_SUCCESS,
          payload: {
            userId: userSetting.userId,
            chat: userSetting.chat[0],
            product: userSetting.product[0],
            category: userSetting.category[0],
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateUserSettingProductQuantity = (bool) => {
  return async (dispatch) => {
    const newBool = {
      bool: bool,
    };
    try {
      dispatch({
        type: userSettingConstant.USERSETTING_PRODUCTQUANTITY,
        payload: {
          productQuantity: bool,
        },
      });
      const res = await axiosApi.post(
        "/usersetting/updateproductquantity",
        newBool
      );
      if (res.status === 200) {
        const { userSetting } = res.data;
        localStorage.setItem("userSetting", JSON.stringify(userSetting));
        dispatch({
          type: userSettingConstant.GETUSERSETTING_SUCCESS,
          payload: {
            userId: userSetting.userId,
            chat: userSetting.chat[0],
            product: userSetting.product[0],
            category: userSetting.category[0],
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const updateUserSettingProductTop = (bool) => {
  return async (dispatch) => {
    const newBool = {
      bool: bool,
    };
    try {
      dispatch({
        type: userSettingConstant.USERSETTING_PRODUCTTOP,
        payload: {
          productTop: bool,
        },
      });
      const res = await axiosApi.post("/usersetting/updateproducttop", newBool);
      if (res.status === 200) {
        const { userSetting } = res.data;
        localStorage.setItem("userSetting", JSON.stringify(userSetting));
        dispatch({
          type: userSettingConstant.GETUSERSETTING_SUCCESS,
          payload: {
            userId: userSetting.userId,
            chat: userSetting.chat[0],
            product: userSetting.product[0],
            category: userSetting.category[0],
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const updateUserSettingProductLowQuantity = (bool) => {
  return async (dispatch) => {
    const newBool = {
      bool: bool,
    };
    try {
      dispatch({
        type: userSettingConstant.USERSETTING_PRODUCTLOWQUANTITY,
        payload: {
          productLowQuantity: bool,
        },
      });
      const res = await axiosApi.post(
        "/usersetting/updateproductlowquantity",
        newBool
      );
      if (res.status === 200) {
        const { userSetting } = res.data;
        localStorage.setItem("userSetting", JSON.stringify(userSetting));
        dispatch({
          type: userSettingConstant.GETUSERSETTING_SUCCESS,
          payload: {
            userId: userSetting.userId,
            chat: userSetting.chat[0],
            product: userSetting.product[0],
            category: userSetting.category[0],
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const updateUserSettingProductTopQuantity = (bool) => {
  return async (dispatch) => {
    const newBool = {
      bool: bool,
    };
    try {
      dispatch({
        type: userSettingConstant.USERSETTING_PRODUCTTOPQUANTITY,
        payload: {
          productTopQuantity: bool,
        },
      });
      const res = await axiosApi.post(
        "/usersetting/updateproducttopquantity",
        newBool
      );
      if (res.status === 200) {
        const { userSetting } = res.data;
        localStorage.setItem("userSetting", JSON.stringify(userSetting));
        dispatch({
          type: userSettingConstant.GETUSERSETTING_SUCCESS,
          payload: {
            userId: userSetting.userId,
            chat: userSetting.chat[0],
            product: userSetting.product[0],
            category: userSetting.category[0],
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateUserSettingCategoryQuantity = (bool) => {
  return async (dispatch) => {
    const newBool = {
      bool: bool,
    };

    try {
      dispatch({
        type: userSettingConstant.USERSETTING_CATEGORYQUANTITY,
        payload: {
          categoryQuantity: bool,
        },
      });
      const res = await axiosApi.post(
        "/usersetting/updatecategoryquantity",
        newBool
      );
      if (res.status === 200) {
        const { userSetting } = res.data;
        localStorage.setItem("userSetting", JSON.stringify(userSetting));
        dispatch({
          type: userSettingConstant.GETUSERSETTING_SUCCESS,
          payload: {
            userId: userSetting.userId,
            chat: userSetting.chat[0],
            product: userSetting.product[0],
            category: userSetting.category[0],
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateUserSettingCategoryHistory = (bool) => {
  return async (dispatch) => {
    const newBool = {
      bool: bool,
    };

    try {
      dispatch({
        type: userSettingConstant.USERSETTING_CATEGORYHISTORY,
        payload: {
          categoryHistory: bool,
        },
      });
      const res = await axiosApi.post(
        "/usersetting/updatecategoryhistory",
        newBool
      );
      if (res.status === 200) {
        const { userSetting } = res.data;
        localStorage.setItem("userSetting", JSON.stringify(userSetting));
        dispatch({
          type: userSettingConstant.GETUSERSETTING_SUCCESS,
          payload: {
            userId: userSetting.userId,
            chat: userSetting.chat[0],
            product: userSetting.product[0],
            category: userSetting.category[0],
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateUserSettingCategoryTopQuantity = (bool) => {
  return async (dispatch) => {
    const newBool = {
      bool: bool,
    };

    try {
      dispatch({
        type: userSettingConstant.USERSETTING_CATEGORYTOPQUANTITY,
        payload: {
          categoryTopQuantity: bool,
        },
      });
      const res = await axiosApi.post(
        "/usersetting/updatecategorytopquantity",
        newBool
      );
      if (res.status === 200) {
        const { userSetting } = res.data;
        localStorage.setItem("userSetting", JSON.stringify(userSetting));
        dispatch({
          type: userSettingConstant.GETUSERSETTING_SUCCESS,
          payload: {
            userId: userSetting.userId,
            chat: userSetting.chat[0],
            product: userSetting.product[0],
            category: userSetting.category[0],
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

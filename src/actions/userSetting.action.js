import { userSettingConstant } from "../configs/constant";
import axiosApi from "../helpers/axios";

export const updateUserSettingHistoryProduct = (bool) => {
  return async (dispatch) => {
    const newBool = {
      bool: bool.toString(),
    };
    dispatch({
      type: userSettingConstant.GETUSERSETTINGHISTORYPRODUCT_REQUEST,
    });
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
        dispatch({
          type: userSettingConstant.GETUSERSETTINGHISTORYPRODUCT_SUCCESS,
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
    dispatch({
      type: userSettingConstant.GETUSERSETTINGPRODUCTQUANTITY_REQUEST,
    });
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
        dispatch({
          type: userSettingConstant.GETUSERSETTINGPRODUCTQUANTITY_SUCCESS,
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
    dispatch({
      type: userSettingConstant.GETUSERSETTINGPRODUCTTOP_REQUEST,
    });
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
        dispatch({
          type: userSettingConstant.GETUSERSETTINGPRODUCTTOP_SUCCESS,
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
    dispatch({
      type: userSettingConstant.GETUSERSETTINGPRODUCTLOWQUANTITY_REQUEST,
    });
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
        dispatch({
          type: userSettingConstant.GETUSERSETTINGPRODUCTLOWQUANTITY_SUCCESS,
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
    dispatch({
      type: userSettingConstant.GETUSERSETTINGPRODUCTTOPQUANTITY_REQUEST,
    });
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
        dispatch({
          type: userSettingConstant.GETUSERSETTINGPRODUCTTOPQUANTITY_SUCCESS,
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
    dispatch({
      type: userSettingConstant.GETUSERSETTINGCATEGORYQUANTITY_REQUEST,
    });
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
        dispatch({
          type: userSettingConstant.GETUSERSETTINGCATEGORYQUANTITY_SUCCESS,
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
    dispatch({
      type: userSettingConstant.GETUSERSETTINGCATEGORYHISTORY_REQUEST,
    });
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
        dispatch({
          type: userSettingConstant.GETUSERSETTINGCATEGORYHISTORY_SUCCESS,
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
    dispatch({
      type: userSettingConstant.GETUSERSETTINGCATEGORYTOPQUANTITY_REQUEST,
    });
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
        dispatch({
          type: userSettingConstant.GETUSERSETTINGCATEGORYTOPQUANTITY_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

import { productConstant } from "../configs/constant";
import axiosApi from "../helpers/axios";

const getAllProduct = (query = 1, search) => {
  return async (dispatch) => {
    try {
      const res = await axiosApi.post(
        `/product/getallproduct?page=${query}`,
        search
      );
      if (res.status === 200) {
        dispatch({
          type: productConstant.GETALLPRODUCT_SUCCESS,
          payload: {
            products: res.data.products,
            productsS: res.data.productsS,
            totalData: res.data.totalData,
            productsLength: res.data.productsLength,
            currentPage: res.data.currentPage,
            productHistory: res.data.productHistory,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: productConstant.ADDPRODUCT_REQUEST });
    try {
      const res = await axiosApi.post("/product/create", form);
      console.log(res);
      if (res.status === 200) {
        dispatch(getAllProduct());
        dispatch({
          type: productConstant.ADDPRODUCT_SUCCESS,
          payload: {
            message: res.data.message,
            product: res.data.product,
          },
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: productConstant.ADDPRODUCT_FAILURE,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  };
};

export const deleteProduct = (data) => {
  return async (dispatch) => {
    dispatch({ type: productConstant.DELETEPRODUCT_REQUEST });
    try {
      const res = await axiosApi.post("/product/delete", data);
      if (res.status == 200) {
        dispatch(getAllProduct());
        dispatch({
          type: productConstant.DELETEPRODUCT_SUCCESS,
          payload: {
            message: res.data.message,
          },
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: productConstant.DELETEPRODUCT_FAILURE,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  };
};

export const updateProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: productConstant.UPDATEPRODUCT_REQUEST });

    try {
      const res = await axiosApi.post("/product/update", form);
      if (res.status === 200) {
        dispatch(getAllProduct());
        dispatch({
          type: productConstant.UPDATEPRODUCT_SUCCESS,
          payload: {
            message: res.data.message,
          },
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: productConstant.UPDATEPRODUCT_FAILURE,
        payload: {
          error: error.response.data.error,
        },
      });
    }
  };
};

export const deleteHistoryProduct = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosApi.post("/product/deleteproducthistory", {
        payload: {
          id,
        },
      });
      if (res.status === 200) {
        // dispatch(initialData())
        dispatch(getAllProduct());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearValidasiProduct = () => {
  return async (dispatch) => {
    dispatch({
      type: "CLEARMESSAGEPRODUCT",
    });
  };
};

export const updateGrapichProduct = () => {
  return async (dispatch) => {
    dispatch({
      type: "UPDATEGRAPICHPRODUCT",
    });
  };
};

export { getAllProduct };

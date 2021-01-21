import { userSettingConstant } from "../configs/constant";

const initialState = {
  userId: null,
  chat: [],
  product: [],
  category: [],
  loading: false,
  error: null,
  loadProductHistory: false,
  loadProductTop: false,
  loadProductTopQuantity: false,
  loadProductLowQuantity: false,
  loadProductQuantity: false,

  loadCategoryHistory: false,
  loadCategoryQuantity: false,
  loadCategoryTopQuantity: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userSettingConstant.GETUSERSETTING_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case userSettingConstant.GETUSERSETTING_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        userId: action.payload.userId,
        chat: action.payload.chat,
        product: action.payload.product,
        category: action.payload.category,
      };
      break;
    case userSettingConstant.GETUSERSETTING_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userSettingConstant.GETUSERSETTINGHISTORYPRODUCT_REQUEST:
      state = {
        ...state,
        loadProductHistory: true,
      };
      break;
    case userSettingConstant.GETUSERSETTINGHISTORYPRODUCT_SUCCESS:
      state = {
        ...state,
        loadProductHistory: false,
      };
      break;
    case userSettingConstant.USERSETTING_HISTTORYPRODUCT:
      state = {
        ...state,
        product: {
          ...state.product,
          productHistory: action.payload.productHistory,
        },
      };
      break;
    case userSettingConstant.GETUSERSETTINGPRODUCTQUANTITY_REQUEST:
      state = {
        ...state,
        loadProductQuantity: true,
      };
      break;
    case userSettingConstant.GETUSERSETTINGPRODUCTQUANTITY_SUCCESS:
      state = {
        ...state,
        loadProductQuantity: false,
      };
      break;
    case userSettingConstant.USERSETTING_PRODUCTQUANTITY:
      state = {
        ...state,
        product: {
          ...state.product,
          productQuantity: action.payload.productQuantity,
        },
      };
      break;
    case userSettingConstant.GETUSERSETTINGPRODUCTTOP_REQUEST:
      state = {
        ...state,
        loadProductTop: true,
      };
      break;
    case userSettingConstant.GETUSERSETTINGPRODUCTTOP_SUCCESS:
      state = {
        ...state,
        loadProductTop: false,
      };
      break;
    case userSettingConstant.USERSETTING_PRODUCTTOP:
      state = {
        ...state,
        product: {
          ...state.product,
          productTop: action.payload.productTop,
        },
      };
      break;
    case userSettingConstant.GETUSERSETTINGPRODUCTLOWQUANTITY_REQUEST:
      state = {
        ...state,
        loadProductLowQuantity: true,
      };
      break;
    case userSettingConstant.GETUSERSETTINGPRODUCTLOWQUANTITY_SUCCESS:
      state = {
        ...state,
        loadProductLowQuantity: false,
      };
      break;
    case userSettingConstant.USERSETTING_PRODUCTLOWQUANTITY:
      state = {
        ...state,
        product: {
          ...state.product,
          productLowQuantity: action.payload.productLowQuantity,
        },
      };
      break;
    case userSettingConstant.GETUSERSETTINGPRODUCTTOPQUANTITY_REQUEST:
      state = {
        ...state,
        loadProductTopQuantity: true,
      };
      break;
    case userSettingConstant.GETUSERSETTINGPRODUCTTOPQUANTITY_SUCCESS:
      state = {
        ...state,
        loadProductTopQuantity: false,
      };
      break;
    case userSettingConstant.USERSETTING_PRODUCTTOPQUANTITY:
      state = {
        ...state,
        product: {
          ...state.product,
          productTopQuantity: action.payload.productTopQuantity,
        },
      };
      break;

    case userSettingConstant.GETUSERSETTINGCATEGORYQUANTITY_REQUEST:
      state = {
        ...state,
        loadCategoryQuantity: true,
      };
      break;
    case userSettingConstant.GETUSERSETTINGCATEGORYQUANTITY_SUCCESS:
      state = {
        ...state,
        loadCategoryQuantity: false,
      };
      break;
    case userSettingConstant.USERSETTING_CATEGORYQUANTITY:
      state = {
        ...state,
        category: {
          ...state.category,
          categoryQuantity: action.payload.categoryQuantity,
        },
      };
      break;
    case userSettingConstant.GETUSERSETTINGCATEGORYHISTORY_REQUEST:
      state = {
        ...state,
        loadCategoryHistory: true,
      };
      break;
    case userSettingConstant.GETUSERSETTINGCATEGORYHISTORY_SUCCESS:
      state = {
        ...state,
        loadCategoryHistory: false,
      };
      break;
    case userSettingConstant.USERSETTING_CATEGORYHISTORY:
      state = {
        ...state,
        category: {
          ...state.category,
          categoryHistory: action.payload.categoryHistory,
        },
      };
      break;
    case userSettingConstant.GETUSERSETTINGCATEGORYTOPQUANTITY_REQUEST:
      state = {
        ...state,
        loadCategoryTopQuantity: true,
      };
      break;
    case userSettingConstant.GETUSERSETTINGCATEGORYTOPQUANTITY_SUCCESS:
      state = {
        ...state,
        loadCategoryTopQuantity: false,
      };
      break;
    case userSettingConstant.USERSETTING_CATEGORYTOPQUANTITY:
      state = {
        ...state,
        category: {
          ...state.category,
          categoryTopQuantity: action.payload.categoryTopQuantity,
        },
      };
      break;
  }
  return state;
};

import { userSettingConstant } from "../configs/constant";

const initialState = {
  userId: null,
  chat: [],
  product: [],
  category: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  console.log(action);
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
    case userSettingConstant.USERSETTING_HISTTORYPRODUCT:
      state = {
        ...state,
        product: {
          ...state.product,
          productHistory: action.payload.productHistory,
        },
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
    case userSettingConstant.USERSETTING_PRODUCTTOP:
      state = {
        ...state,
        product: {
          ...state.product,
          productTop: action.payload.productTop,
        },
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
    case userSettingConstant.USERSETTING_PRODUCTTOPQUANTITY:
      state = {
        ...state,
        product: {
          ...state.product,
          productTopQuantity: action.payload.productTopQuantity,
        },
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
    case userSettingConstant.USERSETTING_CATEGORYHISTORY:
      state = {
        ...state,
        category: {
          ...state.category,
          categoryHistory: action.payload.categoryHistory,
        },
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

import { updateProduct } from "../actions";
import { productConstant } from "../configs/constant";

const initialState = {
  products: [],
  productsS: [],
  totalData: 0,
  productsLength: 0,
  currentPage: 0,
  error: null,
  message: "",
  loading: false,
  updateGrapich: false,
  productHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstant.GETALLPRODUCT_SUCCESS:
      const productHistoryReverse = action.payload.productHistory.reverse();
      state = {
        ...state,
        products: action.payload.products,
        productsS: action.payload.productsS,
        totalData: action.payload.totalData,
        productsLength: action.payload.productsLength,
        currentPage: action.payload.currentPage,
        productHistory: productHistoryReverse,
      };
      break;
    case productConstant.ADDPRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case productConstant.ADDPRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        products: [...state.products, action.payload.product],
        productsLength: state.productsLength + 1,
        productsS: [...state.productsS, action.payload.product],
        updateGrapich: true,
      };
      break;
    case productConstant.ADDPRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case productConstant.DELETEPRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case productConstant.DELETEPRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        updateGrapich: true,
      };
      break;
    case productConstant.DELETEPRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case productConstant.UPDATEPRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstant.UPDATEPRODUCT_SUCCESS:
      const newProduct = action.payload.product;
      console.log(newProduct);
      const products = state.products.map((u) =>
        u._id !== newProduct._id
          ? u
          : {
              _id: newProduct._id,
              name: newProduct.name,
              slug: newProduct.slug,
              description: newProduct.description,
              price: newProduct.price,
              quantity: newProduct.quantity,
              category: newProduct.category,
              reviews: newProduct.reviews,
              productPictures: newProduct.productPictures,
              createdBy: newProduct.createdBy,
              updatedAt: newProduct.updatedAt,
              createdAt: newProduct.createdAt,
            }
      );
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        products: products,
        productsS: products,
        updateGrapich: true,
      };
      break;
    case productConstant.UPDATEPRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case "UPDATEGRAPICHPRODUCT":
      state = {
        ...state,
        updateGrapich: false,
      };
      break;
    case "CLEARMESSAGEPRODUCT":
      state = {
        ...state,
        error: null,
        message: null,
      };
  }

  return state;
};

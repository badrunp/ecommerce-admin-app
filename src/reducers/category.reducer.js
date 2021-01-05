import { categoryConstant } from "../configs/constant";

const initialState = {
  error: null,
  message: "",
  categories: [],
  categoryLength: null,
  categoryData: [],
  categoryHistory: [],
  loading: false,
  per_page: null,
  current_page: null,
  updateGrapich: false,
  loadingSearch: false,
  // category_pagination: 1
};

const buildNewCategory = (parentId, categories, category) => {
  let myCategory = [];

  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        children: [],
      },
    ];
  }

  for (let cate of categories) {
    if (cate._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        children: [],
      };
      myCategory.push({
        ...cate,
        children:
          cate.children.length > 0
            ? [...cate.children, newCategory]
            : [newCategory],
      });
    } else {
      myCategory.push({
        ...cate,
        children: cate.children
          ? buildNewCategory(parentId, cate.children, category)
          : [],
      });
    }
  }

  return myCategory;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConstant.GETALLCATEGORY_REQUEST:
      state = {
        ...state,
        loadingSearch: action.payload.bool,
        loading: true,
      };
      break;
    case categoryConstant.GETALLCATEGORY:
      const cHistory = action.payload.categoryHistory.reverse();
      state = {
        ...state,
        loadingSearch: false,
        loading: false,
        categories: action.payload.categories,
        categoryLength: action.payload.categoryLength,
        categoryData: action.payload.categoryData,
        categoryHistory: cHistory,
        per_page: action.payload.per_page,
        current_page: action.payload.current_page,
        totalPage: action.payload.totalPage,
      };
      break;
    // case "CATEGORY_PAGINATION":
    //     state = {
    //         ...state,
    //         category_pagination: action.payload.number
    //     }
    //     break;
    case categoryConstant.ADDCATEGORY_REQUEST:
      state = {
        ...state,
        error: null,
        loading: true,
      };
      break;
    case categoryConstant.ADDCATEGORY_SUCCESS:
      const category = action.payload.category;
      const updateCategory = buildNewCategory(
        category.parentId,
        state.categories,
        category
      );
      state = {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        updateGrapich: true,
        categories: updateCategory,
        categoryData: [...state.categoryData, category],
        categoryLength: state.categoryLength + 1,
        categoryHistory: [action.payload.categoryH, ...state.categoryHistory],
      };
      break;
    case categoryConstant.ADDCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstant.DELETECATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case categoryConstant.DELETECATEGORY_SUCCESS:
      const ids = action.payload.ids;
      state = {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        updateGrapich: true,
        categories: action.payload.categories,
        categoryLength: state.categoryLength - ids.length,
        categoryData: action.payload.categoryData,
        // categoryHistory: [action.payload.categoryHS, ...state.categoryHistory],
      };
      break;
    case categoryConstant.DELETECATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: "ada yang error",
      };
      break;
    case categoryConstant.UPDATECATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case categoryConstant.UPDATECATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        updateGrapich: true,
        categories: action.payload.categories,
        categoryData: action.payload.categories_,
      };
      break;
    case categoryConstant.UPDATECATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstant.DELETEALLCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case categoryConstant.DELETEALLCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        updateGrapich: true,
        categories: [],
        categoryLength: 0,
        categoryData: [],
        per_page: null,
        current_page: null,
      };
      break;
    case categoryConstant.DELETEALLCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case "CLOSEMESSAGEVALIDASI":
      state = {
        ...state,
        error: null,
        message: "",
      };
      break;
    case "UPDATEGRAPICH":
      state = {
        ...state,
        updateGrapich: false,
      };
      break;
  }

  return state;
};

import { chatConstant } from "../configs/constant";

const initialState = {
  userOnline: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case chatConstant.GETUSERONLINE:
      state = {
        ...state,
        userOnline: action.payload.data,
      };
      break;
  }

  return state;
};

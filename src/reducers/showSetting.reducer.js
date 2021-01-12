const initialState = {
  show: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOWSETTING":
      state = {
        ...state,
        show: !state.show,
      };
      break;
  }

  return state;
};

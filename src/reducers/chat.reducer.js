import { chatConstant } from "../configs/constant";

const initialState = {
  chats: [],
  showChat: false,
  closeChating: false,
  is_message: false,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case chatConstant.GETALLCHAT:
      state = {
        ...state,
        chats: action.payload.chats,
      };
      break;
    case "HANDLESHOWCHAT":
      state = {
        ...state,
        showChat: !state.showChat,
        closeChating: !state.closeChating,
      };
      break;
    case "ADDNOTIFICATIONMESSAGE":
      state = {
        ...state,
        is_message: action.payload.result.is_message,
        userId: action.payload.result.userId,
      };
      break;
    case "GETNOTIFICATIONMESSAGE":
      state = {
        ...state,
        is_message: action.payload.result.is_message,
        userId: action.payload.result.userId,
      };
      break;
    case chatConstant.OUTPUTMESSAGE:
      state = {
        ...state,
        chats: state.chats.concat(action.payload.msg),
      };
      break;
    // case chatConstant.OUTPUTCHAT:
    //     state = {
    //         ...state,
    //         chats: state.chats.concat(action.payload.chats)
    //     }
    //     break;
  }

  return state;
};

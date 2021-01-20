import { chatConstant } from "../configs/constant";

const initialState = {
  chats: [
    {
      userId: "600677ebfdef35001717653e",
      message: "Hallo",
      time: "12:12",
    },
  ],
  showChat: false,
  closeChating: false,
  is_message: false,
  userId: null,
  userOnline: [],
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
      const msg = action.payload.msg[0]
        ? action.payload.msg[0]
        : action.payload.msg;
      // const msg2 = msg[0];
      // console.log(msg);
      // console.log(state.chats[state.chats.length - 1]);
      let updateChats;
      const oldChats = state.chats[state.chats.length - 1];
      if (msg) {
        if (
          oldChats.message === msg.message &&
          oldChats.userId._id === msg.userId._id
        ) {
          updateChats = state.chats.pop();
          updateChats = state.chats.concat(msg);
        } else {
          updateChats = state.chats.concat(msg);
        }
      }

      state = {
        ...state,
        chats: updateChats,
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

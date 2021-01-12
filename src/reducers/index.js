import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import categoryReducer from "./category.reducer";
import chatReducer from "./chat.reducer";
import darkmodeReducer from "./darkmode.reducer";
import initialReducer from "./initial.reducer";
import productReducer from "./product.reducer";
import showSettingReducer from "./showSetting.reducer";
import userReducer from "./user.reducer";
import userOnlineReducer from "./userOnline.reducer";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  sidebar: initialReducer,
  category: categoryReducer,
  chats: chatReducer,
  products: productReducer,
  darkMode: darkmodeReducer,
  userOnline: userOnlineReducer,
  showSetting: showSettingReducer,
});

export default reducer;

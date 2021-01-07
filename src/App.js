import "./App.css";
import Routes from "./configs/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  getAllProduct,
  getChat,
  getNotificationChats,
  getUserOnline,
  userIsLogin,
} from "./actions";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { checkDarkMode } from "./actions/darkmode.action";
import io from "socket.io-client";
import { baseUrl } from "./configs/urlConfigs";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(userIsLogin());
    }

    if (auth.authenticate) {
      dispatch(getAllProduct());
    }

    if (auth.authenticate) {
      dispatch(getAllCategory());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(checkDarkMode());
  }, [checkDarkMode]);

  useEffect(() => {
    dispatch(getNotificationChats(auth.user._id));
  }, [auth.user._id]);

  useEffect(() => {
    dispatch(getChat());
  }, []);

  useEffect(() => {
    let server = baseUrl;
    let socket = io(server);

    console.log(server);

    socket.emit("joinRoom", {
      name: auth.user.fullName,
      room: "global",
      userId: auth.user._id,
    });

    socket.on("usersList", ({ users }) => {
      console.log(users);
      dispatch(getUserOnline(users));
    });
  }, [auth]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;

import "./App.css";
import Routes from "./configs/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
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
import { io } from "socket.io-client";
import { baseUrl } from "./configs/urlConfigs";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // let server = baseUrl;
    if (auth.authenticate) {
      let socket = io(baseUrl, {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
        rememberUpgrade: true,
        transports: ["websocket"],
        secure: true,
        timeout: 50000,
        pingTimeout: 50000,
        autoConnect: true,
        rejectUnauthorized: false,
        auth: {
          token: localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "",
        },
      });

      socket.on("connect", () => {
        socket.emit("joinRoom", {
          name: auth.user.fullName,
          room: "global",
          userId: auth.user._id,
        });

        let count = 0;
        setInterval(() => {
          socket.volatile.emit("ping", ++count);
        }, 1000);

        socket.on("usersList", ({ users }) => {
          dispatch(getUserOnline(users));
        });
      });

      socket.on("connect_error", () => {
        setTimeout(() => {
          socket.connect();
        }, 1000);
      });
    }
  }, [auth]);

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
    if (auth.authenticate) {
      dispatch(getChat());
    }

    if (auth.authenticate) {
      dispatch(getNotificationChats(auth.user._id));
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(checkDarkMode());
  }, [checkDarkMode]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;

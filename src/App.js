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

  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);
  // const alertUser = (e) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  // };

  useEffect(() => {
    // window.onbeforeunload = (e) => {
    //   console.log("wkwkwkw");
    // };
    // if (window.performance) {
    //   if (performance.navigation.type == 1) {
    //     alert("This page is reloaded");
    //   } else {
    //     alert("This page is not reloaded");
    //   }
    // }
  }, []);
  // useEffect(() => {
  //   let server = baseUrl;

  //   let socket = io(server);

  //   socket.on("connect", () => {
  //     socket.on("usersList", ({ users }) => {
  //       dispatch(getUserOnline(users));
  //     });
  //   });
  // }, [auth]);
  return (
    <>
      <Routes />
    </>
  );
}

export default App;

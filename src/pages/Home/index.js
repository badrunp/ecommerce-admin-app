import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import io from "socket.io-client";
import { baseUrl } from "../../configs/urlConfigs";
import { useDispatch, useSelector } from "react-redux";
import { getUserOnline } from "../../actions";

function Home() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { userOnline } = useSelector((state) => state.userOnline);

  useEffect(() => {
    let server = baseUrl;
    let socket = io(server);

    userOnline.map((item) => {
      if (item.userId !== auth.user._id && item.room !== "global") {
        socket.emit("joinRoom", {
          name: auth.user.fullName,
          room: "global",
          userId: auth.user._id,
        });

        socket.on("usersList", ({ users }) => {
          dispatch(getUserOnline(users));
        });
      }
    });
  }, [auth, userOnline]);

  return (
    <>
      <Layout>
        <h1>Selamat Datang</h1>
      </Layout>
    </>
  );
}

export default Home;

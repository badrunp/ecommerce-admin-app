import React from "react";
import "./style.css";
import { IoMdChatboxes, IoMdSend } from "react-icons/io";
import io from "socket.io-client";
import {
  getNotificationChats,
  getChat,
  handleShowChat,
  outputChat,
  removeNotificationChats,
  addNotificationChats,
  getUserOnline,
} from "../../actions";
import { connect } from "react-redux";
import moment from "moment";
import { motion } from "framer-motion";
import { baseUrl, baseUrlImage } from "../../configs/urlConfigs";
import { RiCloseLine } from "react-icons/ri";

class Chat extends React.Component {
  state = {
    message: "",
    outputMsg: "",
    is_scrool: false,
  };

  componentDidMount() {
    let server = baseUrl;

    this.socket = io(server, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
      transports: ["polling", "websocket"],
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

    this.socket.emit("joinRoom", {
      name: this.props.auth.user.fullName,
      room: "global",
      userId: this.props.auth.user._id,
    });

    this.socket.on("usersList", ({ users }) => {
      this.props.dispatch(getUserOnline(users));
    });

    if (this.state.message.length === 0) {
      this.setState({
        outputMsg: "",
      });
    }
    this.socket.on("outputMessage", (msg) => {
      if (msg[0].userId._id != this.props.auth.user._id) {
        this.props.dispatch(addNotificationChats(this.props.auth.user._id));
      }
      if (this.state.message === "") {
        this.setState({
          outputMsg: msg,
        });
      }
      this.props.dispatch(outputChat(this.state.outputMsg));
    });

    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.state.outputMsg = false;
    this.state.message = false;
  }

  componentDidUpdate() {
    // this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    // let localscroll = JSON.parse(localStorage.getItem("scroolchats"));
    // if (this.state.outputMsg) {
    //   this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    // }
    this.scrollToBottom();
  }

  handleCangeInput = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  handleShowChat = () => {
    const checkCount = [];
    this.props.userOnline.userOnline.map((item) => {
      if (item.userId === this.props.auth.user._id && item.room === "global") {
        checkCount.push(item);
      }
    });

    if (checkCount.length === 0) {
      this.socket.emit("joinRoom", {
        name: this.props.auth.user.fullName,
        room: "global",
        userId: this.props.auth.user._id,
      });

      this.socket.on("usersList", ({ users }) => {
        this.props.dispatch(getUserOnline(users));
      });
    }

    this.props.dispatch(handleShowChat());
    this.props.dispatch(removeNotificationChats(this.props.auth.user._id));
  };

  sendChat = (e) => {
    e.preventDefault();
    const chat = this.state.message;
    const userId = this.props.auth.user._id;
    const time = moment().format("HH:mm");

    // const userM = this.props.auth.map((item) => item._id === userId);

    if (chat.length === 0) {
      return;
    }

    const oldChat = this.props.chats.chats[this.props.chats.chats.length - 1];
    const chatL = oldChat.message.toLowerCase();

    if (chat.toLowerCase() === chatL && oldChat.userId._id === userId) {
      this.setState({
        message: "",
      });
      return;
    }

    const c = chat.split(" ");
    for (let i = 0; i < c.length; i++) {
      if (c[i].length > 20) {
        this.setState({
          message: "",
        });
        return;
      }
    }

    const msgObj = {
      message: chat,
      time: time,
      userId: this.props.auth.user,
    };

    this.props.dispatch(outputChat(msgObj));

    if (this.state.message) this.socket.emit("message", { chat, userId, time });

    this.setState({ message: "" });
  };

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <>
        <div
          className={this.props.chats.showChat ? "chating active" : "chating"}
        >
          <div
            className={
              this.props.darkMode
                ? "chating-wrapper bg-content-dark-mode"
                : "chating-wrapper"
            }
          >
            <div
              className={
                this.props.darkMode
                  ? "chating-header bg-content-orange-dark-mode"
                  : "chating-header"
              }
            >
              <h1>
                <IoMdChatboxes /> Live Chat
              </h1>

              <div className="user-online-info">
                <p className="icon-user-online-info"></p> online:{" "}
                {this.props.userOnline.userOnline.length}
              </div>

              <RiCloseLine
                onClick={this.handleShowChat}
                className="chating-icon-close"
              />
            </div>
            <div
              className="main-chating"
              ref={(el) => {
                this.messagesEnd = el;
              }}
            >
              {this.props.chats.chats &&
                this.props.chats.chats.map((chat, i) => {
                  if (chat.userId.fullName === this.props.auth.user.fullName) {
                    return (
                      <div className="chating-user-right" key={i}>
                        <div className="box-chat-message-right">
                          <p className="chat-user-name">
                            {chat.userId.fullName}
                          </p>
                          <div
                            className={
                              this.props.darkMode
                                ? "user-message-right bg-content-orange-dark-mode"
                                : "user-message-right"
                            }
                          >
                            <p className="chat-message-right">
                              {" "}
                              {chat.message}
                            </p>
                            <p
                              className={
                                this.props.darkMode
                                  ? "time-chating-right text-color-dark-mode"
                                  : "time-chating-right"
                              }
                            >
                              {chat.time}
                            </p>
                          </div>
                        </div>
                        <div className="user-chating-image">
                          {this.props.userOnline.userOnline.map((item, i) => {
                            if (item.userId === chat.userId._id) {
                              return (
                                <div className="icon-user-online" key={i}></div>
                              );
                            }
                          })}
                          <img src={baseUrlImage(chat.userId.image)} alt="" />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="chating-user-left" key={i}>
                        <div className="user-chating-image">
                          {this.props.userOnline.userOnline.map((item, i) => {
                            if (item.userId === chat.userId._id) {
                              return (
                                <div className="icon-user-online" key={i}></div>
                              );
                            }
                          })}
                          <img src={baseUrlImage(chat.userId.image)} alt="" />
                        </div>
                        <div className="box-chat-message">
                          <p className="chat-user-name">
                            {chat.userId.fullName}
                          </p>
                          <div
                            className={
                              this.props.darkMode
                                ? "user-message active"
                                : "user-message"
                            }
                          >
                            <p className="chat-message">{chat.message}</p>
                            <p
                              className={
                                this.props.darkMode
                                  ? "time-chating bg-content-dark-mode"
                                  : "time-chating"
                              }
                            >
                              {chat.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}

              <div
                ref={(el) => {
                  this.el = el;
                }}
              ></div>
            </div>
            <div className="input-chating">
              <div className="main-input">
                <form onSubmit={this.sendChat}>
                  <input
                    className="input-message"
                    placeholder="Ketikan Pesan"
                    value={this.state.message}
                    onChange={this.handleCangeInput}
                  />
                  <button className="btn-message" type="submit">
                    <IoMdSend className="icon-send-message" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          whileTap={{
            scale: 0.85,
          }}
          className={
            this.props.chats.showChat
              ? "clicked-chating active"
              : `${
                  this.props.darkMode
                    ? "clicked-chating bg-content-orange-dark-mode"
                    : "clicked-chating"
                }`
          }
          onClick={this.handleShowChat}
        >
          {this.props.chats.is_message &&
          this.props.chats.chats.length > 0 &&
          !this.props.chats.showChat ? (
            <div
              className={
                this.props.chats.showChat
                  ? "notification-chating active"
                  : "notification-chating"
              }
            ></div>
          ) : null}
          <IoMdChatboxes className="icon-clicked-chating" />
        </motion.div>

        {this.props.chats.closeChating ? (
          <div className="close-chating" onClick={this.handleShowChat}></div>
        ) : null}
      </>
    );
  }
}

function mapsToProps(state) {
  return {
    chats: state.chats,
    auth: state.auth,
    darkMode: state.darkMode.darkMode,
    userOnline: state.userOnline,
  };
}

export default connect(mapsToProps)(Chat);

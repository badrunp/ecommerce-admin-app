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
  };

  componentDidMount() {
    let server = baseUrl;

    this.props.dispatch(getChat());

    this.props.dispatch(getNotificationChats(this.props.auth.user._id));

    this.socket = io(server);

    if (this.state.message.length === 0) {
      this.setState({
        outputMsg: "",
      });
    }

    this.socket.on("outputMessage", (msg) => {
      // // if(msg[0].userId._id != this.props.auth.user._id){
      // //     this.props.dispatch(addNotificationChats(this.props.auth.user._id))
      // // }
      // console.log(msg);
      // console.log(this.props.auth.user._id);
      if (this.state.message === "") {
        this.setState({
          outputMsg: msg,
        });
      }
      //   this.props.dispatch(outputChat(this.state.outputMsg));
    });
  }

  componentWillUnmount() {
    this.state.outputMsg = false;
    this.state.message = false;
  }

  componentDidUpdate() {
    // this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
  }

  handleCangeInput = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  handleShowChat = () => {
    this.props.dispatch(handleShowChat());
    this.props.dispatch(removeNotificationChats(this.props.auth.user._id));
  };

  sendChat = (e) => {
    e.preventDefault();
    const chat = this.state.message;
    const userId = this.props.auth.user._id;
    const time = moment().format("HH:mm");

    // const userM = this.props.auth.map((item) => item._id === userId);

    const msgObj = {
      message: chat,
      time: time,
      userId: this.props.auth.user,
    };

    this.props.dispatch(outputChat(msgObj));

    if (this.state.message) this.socket.emit("message", { chat, userId, time });

    this.setState({ message: "" });
  };

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
                          <img src={baseUrlImage(chat.userId.image)} alt="" />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="chating-user-left" key={i}>
                        <div className="user-chating-image">
                          <img src={baseUrlImage(chat.userId.image)} alt="" />
                        </div>
                        <div className="box-chat-message">
                          <p className="chat-user-name">
                            {chat.userId.fullName}
                          </p>
                          <div className="user-message">
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

              {/* <div
                                ref={el => {
                                    this.messagesEnd = el;
                                }}

                                style={{ float: 'left', clear: 'both' }}
                            /> */}
            </div>
            <div className="input-chating">
              <div className="main-input">
                <form onSubmit={this.sendChat}>
                  <input
                    className="input-message"
                    placeholder="Ketikan Pesan"
                    value={this.state.message}
                    onChange={this.handleCangeInput}
                    autoFocus
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
          {this.props.chats.is_message && this.props.chats.chats.length > 0 ? (
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
  };
}

export default connect(mapsToProps)(Chat);

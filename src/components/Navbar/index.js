import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { profilUser } from "../../assets";
import {
  IoMdArrowDropdown,
  IoIosNotificationsOutline,
  IoIosClose,
} from "react-icons/io";
import { closeSidebarMenu, logout } from "../../actions";
import { ImSpinner9 } from "react-icons/im";
import { FiMenu } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Input from "../Ui/Input";
import { BiSun } from "react-icons/bi";
import { Link } from "react-router-dom";
import { baseUrlImage } from "../../configs/urlConfigs";
import { onDarkMode } from "../../actions/darkmode.action";
import { IoIosCloudyNight, IoIosPartlySunny } from "react-icons/io";
import { TiWeatherPartlySunny } from "react-icons/ti";

function Navbar() {
  const sidebar = useSelector((state) => state.sidebar);
  const auth = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleDarkMode = () => {
    dispatch(onDarkMode());
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <>
      {auth.loading ? (
        <div className="loading-2">
          <ImSpinner9 className="loading-2-icon" />
        </div>
      ) : null}
      <div
        className={darkMode ? "navbarMenu bg-content-dark-mode" : "navbarMenu"}
      >
        <div
          className={
            sidebar.sidebar ? "navbar-container active" : "navbar-container"
          }
        >
          <div className="navbar-left">
            <div
              className={
                darkMode
                  ? "navbar-menu-icon border-color-dark-mode"
                  : "navbar-menu-icon"
              }
            >
              {sidebar.sidebar ? (
                <HiMenuAlt2
                  onClick={() => dispatch(closeSidebarMenu())}
                  className="menu-icon"
                />
              ) : (
                <HiMenuAlt2
                  onClick={() => dispatch(closeSidebarMenu())}
                  className="menu-icon"
                />
              )}
            </div>

            <div className="navbar-search">
              <div className="box-search">
                <Input
                  style={{
                    padding: "0 23px 0 50px",
                    height: "40px",
                    fontSize: "16px",
                    width: "100%",
                  }}
                  type="text"
                  placeholder="Masukan Pencarian...   "
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  icon={
                    searchInput.length > 0 ? (
                      <IoIosClose
                        className="icon-input-clear search-big"
                        onClick={() => setSearchInput("")}
                      />
                    ) : null
                  }
                  iconleft={<BsSearch className="iconLeft" />}
                  className={darkMode ? "input-all-dark-mode" : "input-all"}
                />
              </div>
            </div>
          </div>

          <div className="navbar-right">
            <div
              className={
                darkMode
                  ? "navbar-notifikasi border-color-dark-mode"
                  : "navbar-notifikasi"
              }
            >
              <div
                className={
                  darkMode
                    ? "box-notifikasi-icon link-color-dark-mode"
                    : "box-notifikasi-icon"
                }
              >
                <IoIosNotificationsOutline className="notifikasi-icon" />
                <div className="is-notifikasi-icon"></div>
              </div>
            </div>
            <div className="navbar-user-info">
              <div className={dropdown ? "user-info active" : "user-info"}>
                <div
                  className="user-image"
                  onClick={() => setDropdown(!dropdown)}
                >
                  <div className="icon-user-online"></div>
                  <img src={baseUrlImage(auth.user.image)} alt="" />
                </div>
                <div
                  className="user-name"
                  onClick={() => setDropdown(!dropdown)}
                >
                  <p>{auth.user.fullName}</p>
                </div>
                <div className="user-icon">
                  <IoMdArrowDropdown onClick={() => setDropdown(!dropdown)} />
                </div>
              </div>

              <div
                className={
                  dropdown
                    ? `${
                        darkMode
                          ? "user-dropdown active bg-content-dark-mode"
                          : "user-dropdown active"
                      }`
                    : "user-dropdown"
                }
              >
                <div
                  className={
                    darkMode
                      ? "user-dropdown-info bg-content-dark-mode"
                      : "user-dropdown-info"
                  }
                >
                  <img src={baseUrlImage(auth.user.image)} alt="" />
                  <div
                    className={
                      darkMode
                        ? "box-user-info text-color-dark-mode"
                        : "box-user-info"
                    }
                  >
                    <h5>{auth.user.fullName}</h5>
                    <h5 style={{ fontSize: "14px", fontWeight: "400" }}>
                      {auth.user.email}
                    </h5>
                  </div>
                </div>
                <div
                  className={
                    darkMode
                      ? "user-dropdown-menu bg-content-dark-mode"
                      : "user-dropdown-menu"
                  }
                >
                  <Link
                    to="/profil"
                    className={darkMode ? "link-color-dark-mode" : ""}
                  >
                    {" "}
                    <FaUser className="icon-dropdown" /> Profil Saya
                  </Link>
                </div>
                <div
                  className={
                    darkMode
                      ? "user-dropdown-menu bg-content-dark-mode"
                      : "user-dropdown-menu"
                  }
                >
                  <div className="d-flex align-items-center">
                    <div
                      className={darkMode ? "toggle active" : "toggle"}
                      onClick={handleDarkMode}
                    ></div>
                    {darkMode ? (
                      <IoIosCloudyNight
                        className="ml-2"
                        style={{ fontSize: "25px" }}
                      />
                    ) : (
                      <TiWeatherPartlySunny
                        className="ml-2"
                        style={{ fontSize: "25px" }}
                      />
                    )}
                  </div>
                </div>
                <div
                  className={
                    darkMode
                      ? "user-logout bg-content-dark-mode"
                      : "user-logout"
                  }
                >
                  <button
                    className={darkMode ? "link-color-dark-mode" : ""}
                    onClick={logoutUser}
                  >
                    <RiLogoutBoxRLine className="icon-dropdown" />
                    Keluar Akun
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={dropdown ? "dropdown-close active" : "dropdown-close"}
        onClick={() => setDropdown(!dropdown)}
      ></div>
    </>
  );
}

export default Navbar;

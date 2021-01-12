import React, { useState, useEffect } from "react";
import "./style.css";
import { GoDashboard } from "react-icons/go";
import { AiOutlineShoppingCart, AiTwotoneSetting } from "react-icons/ai";
import { RiHandbagLine } from "react-icons/ri";
import { BsPencil } from "react-icons/bs";
import { FiAirplay } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdFlame, IoIosFingerPrint } from "react-icons/io";
import { closeSidebarMenu } from "../../actions";

function Sidebar() {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);
  const { darkMode } = useSelector((state) => state.darkMode);
  const [isClose, setIsClose] = useState(false);

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(() => {
    if (windowWidth < 990) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
  }, [windowWidth]);

  return (
    <>
      <div
        className={
          sidebar.sidebar
            ? `${
                darkMode
                  ? "sidebar active bg-content-dark-mode"
                  : "sidebar active"
              }`
            : `${darkMode ? "sidebar bg-content-dark-mode" : "sidebar"}`
        }
      >
        <div className="sidebar-wrapper">
          <div className="sidebar-logo">
            <ul
              className={
                darkMode
                  ? "sidebar-logo-wrapper bg-content-orange-dark-mode"
                  : "sidebar-logo-wrapper"
              }
            >
              <li
                onClick={() => {
                  if (isClose) {
                    dispatch(closeSidebarMenu(false));
                  }
                }}
              >
                <NavLink to="/" className="box-sidebar-logo">
                  <div className="box-icon">
                    <IoIosFingerPrint className="icon-flame" />
                  </div>
                  <span className="sidebar-brand-name">DuosDev</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="sidebar-menu mt-4">
            <ul className="sidebar-item">
              <li
                onClick={() => {
                  if (isClose) {
                    dispatch(closeSidebarMenu(false));
                  }
                }}
              >
                <NavLink exact to="/" className="sidebar-link">
                  <div className="sidebar-link-icon">
                    <GoDashboard className="menu-link-icon" />
                  </div>
                  <span className="sidebar-link-name">Dashboard</span>
                </NavLink>
              </li>
              <li
                onClick={() => {
                  if (isClose) {
                    dispatch(closeSidebarMenu(false));
                  }
                }}
              >
                <NavLink to="/halaman" className="sidebar-link">
                  <div className="sidebar-link-icon">
                    <FiAirplay className="menu-link-icon" />
                  </div>
                  <span className="sidebar-link-name">Halaman</span>
                </NavLink>
              </li>
              <li
                onClick={() => {
                  if (isClose) {
                    dispatch(closeSidebarMenu(false));
                  }
                }}
              >
                <NavLink to="/kategori" className="sidebar-link">
                  <div className="sidebar-link-icon">
                    <BsPencil className="menu-link-icon" />
                  </div>
                  <span className="sidebar-link-name">Kategori</span>
                </NavLink>
              </li>
              <li
                onClick={() => {
                  if (isClose) {
                    dispatch(closeSidebarMenu(false));
                  }
                }}
              >
                <NavLink to="/produk" className="sidebar-link">
                  <div className="sidebar-link-icon">
                    <RiHandbagLine className="menu-link-icon" />
                  </div>
                  <span className="sidebar-link-name">Produk</span>
                </NavLink>
              </li>
              <li
                onClick={() => {
                  if (isClose) {
                    dispatch(closeSidebarMenu(false));
                  }
                }}
              >
                <NavLink to="/order" className="sidebar-link">
                  <div className="sidebar-link-icon">
                    <AiOutlineShoppingCart className="menu-link-icon" />
                  </div>
                  <span className="sidebar-link-name">Order</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {sidebar.sidebar ? (
        <div
          className="closenavbar navbar-close-mobile-show"
          onClick={() => dispatch(closeSidebarMenu(false))}
        ></div>
      ) : null}
    </>
  );
}

export default Sidebar;

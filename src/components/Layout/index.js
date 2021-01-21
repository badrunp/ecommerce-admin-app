import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Chat from "../Chat";
import Navbar from "../Navbar";
import Sidebar from "../SIdebar";
import "./style.css";
import { ImSpinner9 } from "react-icons/im";

function Layout(props) {
  const sidebar = useSelector((state) => state.sidebar);
  const { darkMode } = useSelector((state) => state.darkMode);
  const products = useSelector((state) => state.products);
  const category = useSelector((state) => state.category);

  return (
    <>
      <Chat />
      <Sidebar />
      <Navbar />
      {/* {category.categories.length === 0 && category.load ? (
        <div className="loading-2">
          <ImSpinner9 className="loading-2-icon" />
        </div>
      ) : null} */}

      {products.products.length === 0 || category.categories.length === 0 ? (
        <div className="layout-loading-container">
          <div className="loadingio-spinner-dual-ball-qo0vozo5pwc">
            <div className="ldio-ht0g6nnvd0o">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          Mengamil semua data....
        </div>
      ) : (
        <div
          className={
            sidebar.sidebar
              ? `${
                  darkMode
                    ? "layout-container active bg-dark-mode"
                    : "layout-container active"
                }`
              : `${
                  darkMode
                    ? "layout-container bg-dark-mode"
                    : "layout-container"
                }`
          }
        >
          {props.children}

          <footer
            className={
              darkMode
                ? "footer bg-white bg-content-dark-mode"
                : "footer bg-white"
            }
          >
            <div
              className={
                darkMode ? "copyright bg-content-dark-mode" : "copyright"
              }
            >
              <p className={darkMode ? "text-color-dark-mode" : ""}>
                &copy; <span>2021</span> Copyright Duos Dev | All Rights
                Reserved
              </p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
export default Layout;

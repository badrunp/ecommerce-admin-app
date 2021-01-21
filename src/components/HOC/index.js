import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import "./style.css";

function PrivateComp({ component: Component, ...rest }) {
  const [spinner, setSpinner] = useState(true);

  // useEffect(() => {
  //   window.onbeforeunload = (e) => {
  //     e.preventDefault();
  //     setSpinner(true);
  //   };
  // }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    setSpinner(true);
  };

  useEffect(() => {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      setSpinner(true);
    } else {
      console.info("This page is not reloaded");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000);
  }, []);
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (token && user) {
          if (spinner) {
            return (
              <>
                <div className="loader-main">
                  <div className="lds-dual-ring"></div>
                </div>
              </>
            );
          }
          return <Component {...props} />;
        } else {
          localStorage.clear();
          return <Redirect to="/masuk" />;
        }
      }}
    />
  );
}

export default PrivateComp;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import "./style.css";

function PrivateComp({ component: Component, ...rest }) {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 3000);
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
                  Memuat....
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

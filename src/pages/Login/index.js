import React, { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login, timeOutLogin, timeOutRegister } from "../../actions";
import { LoginPage } from "../../assets";
import "./style.css";
import { ImSpinner9 } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";

function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);

  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    if (!auth.loading) {
      dispatch(login(user));
    }
  };

  useEffect(() => {
    if (user.message) {
      setTimeout(() => dispatch(timeOutRegister()), 4000);
    }
  }, []);

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="login">
        {user.message ? (
          <div className="message-validasi-success message-validasi">
            <div>
              <p className="message-validasi-text">
                <BsCheckAll className="message-validasi-icon" /> {user.message}
              </p>
            </div>
          </div>
        ) : null}

        <div className="container-fluid login-wrapper">
          <Row className="auth-row">
            <Col md="6">
              <img className="login-page" src={LoginPage} alt="" />
            </Col>
            <Col md="6" style={{ marginTop: "20px" }}>
              <div className="login-box">
                <div className="login-title">
                  <h2>Masuk</h2>
                </div>

                <form>
                  <div className="input-group form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      id="ui"
                      className={
                        auth.error.email.length > 0
                          ? "form-control passwordInput is-invalid-input"
                          : "form-control passwordInput"
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="input-group-icon">
                      <span className="input-icon">
                        <FaRegUser />
                      </span>
                    </div>
                  </div>

                  {auth.error.email.length > 0 ? (
                    <div
                      style={{ display: "block" }}
                      className="invalid-feedback"
                    >
                      {auth.error.email[0].msg}
                    </div>
                  ) : null}

                  <div className="input-group form-group">
                    {eye ? (
                      <input
                        type="text"
                        placeholder="Password"
                        className={
                          auth.error.password.length > 0
                            ? "form-control passwordInput is-invalid-input"
                            : "form-control passwordInput"
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    ) : (
                      <input
                        type="password"
                        placeholder="Password"
                        className={
                          auth.error.password.length > 0
                            ? "form-control passwordInput is-invalid-input"
                            : "form-control passwordInput"
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    )}
                    <div className="input-group-icon">
                      <span className="input-icon">
                        {!eye ? (
                          <svg
                            onClick={() => setEye(!eye)}
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-eye-fill eye-password"
                            fill="currentColor"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                          </svg>
                        ) : (
                          <svg
                            onClick={() => setEye(!eye)}
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-eye-slash-fill eye-password"
                            fill="currentColor"
                          >
                            <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z" />
                            <path d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>
                  {auth.error.password.length > 0 ? (
                    <div
                      style={{ display: "block" }}
                      className="invalid-feedback"
                    >
                      {auth.error.password[0].msg}
                    </div>
                  ) : null}

                  <div className="form-group">
                    <button className="btn-blue btn-lg" onClick={userLogin}>
                      {auth.loading ? (
                        <ImSpinner9 className="loading" />
                      ) : (
                        "Masuk"
                      )}
                    </button>
                  </div>

                  <p className="or-auth">OR</p>

                  <div className="form-group auth-data">
                    <span>Belum Punya Akun?</span>
                    <Link to="/daftar" className="btn-blueOutline">
                      Daftar
                    </Link>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Login;

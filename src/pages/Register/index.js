import React, { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { RegisterPage } from "../../assets";
import "./style.css";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, timeOutRegister } from "../../actions";
import { ImSpinner9 } from "react-icons/im";
import { FaCheck, FaRegUser } from "react-icons/fa";
import { VscKey } from "react-icons/vsc";
import { HiOutlineMail } from "react-icons/hi";

function Register() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);

  const userRegister = (e) => {
    e.preventDefault();

    const userForm = {
      fullName: nama,
      email,
      password,
    };

    if (!user.loading) {
      dispatch(register(userForm));
    }
  };

  useEffect(() => {
    if (user.message) {
      setTimeout(() => dispatch(timeOutRegister()), 4000);
    }
  }, [user]);

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="register">
        {user.message ? (
          <Alert variant="success" className="success-validasi">
            <FaCheck /> {user.message}
          </Alert>
        ) : null}

        <div className="container-fluid register-wrapper">
          <Row className="auth-row">
            <Col md="6">
              <img className="register-page" src={RegisterPage} alt="" />
            </Col>
            <Col md="6" style={{ marginTop: "20px" }}>
              <div className="register-box">
                <div className="register-title">
                  <h2>Daftar</h2>
                </div>

                <form>
                  <div className="input-group form-group">
                    <input
                      type="text"
                      placeholder="Nama"
                      className={
                        user.error.name.length > 0
                          ? "form-control nameInput is-invalid-input"
                          : "form-control nameInput"
                      }
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                    <div className="input-group-icon">
                      <span className="input-icon">
                        <FaRegUser />
                      </span>
                    </div>
                  </div>
                  {user.error.name.length > 0 ? (
                    <div
                      style={{ display: "block" }}
                      className="invalid-feedback"
                    >
                      {user.error.name[0].msg}
                    </div>
                  ) : null}

                  <div className="input-group form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      className={
                        user.error.email.length > 0
                          ? "form-control nameInput is-invalid-input"
                          : "form-control nameInput"
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="input-group-icon">
                      <span className="input-icon" style={{ fontSize: "24px" }}>
                        <HiOutlineMail />
                      </span>
                    </div>
                  </div>
                  {user.error.email.length > 0 ? (
                    <div
                      style={{ display: "block" }}
                      className="invalid-feedback"
                    >
                      {user.error.email[0].msg}
                    </div>
                  ) : null}

                  <div className="input-group form-group">
                    {eye ? (
                      <input
                        type="text"
                        placeholder="Password"
                        className={
                          user.error.password.length > 0
                            ? "form-control nameInput is-invalid-input"
                            : "form-control nameInput"
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    ) : (
                      <input
                        type="password"
                        placeholder="Password"
                        className={
                          user.error.password.length > 0
                            ? "form-control nameInput is-invalid-input"
                            : "form-control nameInput"
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
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path
                              fillRule="evenodd"
                              d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                            />
                          </svg>
                        ) : (
                          <svg
                            onClick={() => setEye(!eye)}
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-eye-slash-fill eye-password"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z" />
                            <path
                              fillRule="evenodd"
                              d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>
                  {user.error.password.length > 0 ? (
                    <div
                      style={{ display: "block" }}
                      className="invalid-feedback"
                    >
                      {user.error.password[0].msg}
                    </div>
                  ) : null}

                  <div className="form-group">
                    <button className="btn-blue btn-lg" onClick={userRegister}>
                      {user.loading ? (
                        <ImSpinner9 className="loading" />
                      ) : (
                        "Daftar"
                      )}
                    </button>
                  </div>

                  <p className="or-auth">OR</p>

                  <div className="form-group auth-data">
                    <span>Sudah Punya Akun? </span>
                    <Link to="/masuk" className="btn-blueOutline">
                      Masuk
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

export default Register;

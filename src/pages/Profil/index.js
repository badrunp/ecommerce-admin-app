import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { IoMdImages } from "react-icons/io";
import {
  updateAlamat,
  updateImage,
  updateName,
  updateTanggalLahir,
  updateTelepon,
  updateUmur,
} from "../../actions";
import { baseUrlImage } from "../../configs/urlConfigs";
import { MdPermContactCalendar, MdClose } from "react-icons/md";
import { NavLink, Route, Switch } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import UpdatePassword from "./component/UpdatePasword";
import { CgProfile } from "react-icons/cg";
import { VscKey, VscSaveAs, VscAccount, VscWarning } from "react-icons/vsc";
import { HiOutlineMail } from "react-icons/hi";
import { BsPencil, BsCheckAll } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import Input from "../../components/Ui/Input";
import { GrFormClose } from "react-icons/gr";
import { closeValidasiMessageAuth } from "../../actions";

function Profil(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.darkMode);

  const [profilImage, setProfilImage] = useState("");
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [showUmur, setShowUmur] = useState(false);
  const [showTanggalLahir, setShowTanggalLahir] = useState(false);
  const [showNoTelpon, setShowNoTelpon] = useState(false);
  const [showAlamat, setShowAlamat] = useState(false);

  const [name, setName] = useState(auth.user.fullName);
  const [umur, setUmur] = useState(auth.user.umur ? auth.user.umur : "");
  const [tanggalLahir, setTanggalLahir] = useState(
    auth.user.tanggalLahir ? auth.user.tanggalLahir : ""
  );
  const [telepon, setTelepon] = useState(
    auth.user.telepon ? auth.user.telepon : ""
  );
  const [alamat, setAlamat] = useState(
    auth.user.alamat ? auth.user.alamat : ""
  );

  const handleProfilImage = (e) => {
    setProfilImage(e.target.files[0]);
    const form = new FormData();
    form.append("image", e.target.files[0]);
    form.append("userId", auth.user._id);
    const user = {
      email: auth.user.email,
      password: auth.user.password,
    };
    dispatch(updateImage(form, user));
  };

  const handleEditName = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      userId: auth.user._id,
    };

    dispatch(updateName(data));
  };

  const handleEditAlamat = (e) => {
    e.preventDefault();

    const data = {
      alamat: alamat,
      userId: auth.user._id,
    };

    dispatch(updateAlamat(data));
  };

  const handleEditUmur = (e) => {
    e.preventDefault();

    const data = {
      umur: umur,
      userId: auth.user._id,
    };

    dispatch(updateUmur(data));
  };

  const handleEditTelepon = (e) => {
    e.preventDefault();

    const data = {
      telepon: telepon,
      userId: auth.user._id,
    };

    dispatch(updateTelepon(data));
  };

  const handleEditTanggalLahir = (e) => {
    e.preventDefault();

    const data = {
      tanggalLahir: tanggalLahir,
      userId: auth.user._id,
    };

    dispatch(updateTanggalLahir(data));
  };

  useEffect(() => {
    if (auth.message || auth.errorValidasi) {
      setTimeout(() => {
        dispatch(closeValidasiMessageAuth());
      }, 3000);
    }
  }, []);

  return (
    <Layout>
      <div className="profil">
        <div className="profil-main">
          <div className="profil-main-info ">
            <div
              className={
                darkMode ? "profil-info bg-content-dark-mode" : "profil-info"
              }
            >
              <div className="profil-info-1">
                <div className="profil-info-1-image">
                  <img src={baseUrlImage(auth.user.image)} />
                  {/* <div className="profil-update-image">
                                        <input type="file" name="image" id="profilImage" onChange={handleProfilImage} />
                                        <label htmlFor="profilImage"><IoMdImages className="profil-update-image-icon" /></label>
                                    </div> */}
                </div>
                <h4>{auth.user.fullName}</h4>
                <h6 style={{ fontSize: "14px", fontWeight: "500" }}>
                  {auth.user.email}
                </h6>
              </div>
            </div>

            <div className="profil-kontak"></div>
          </div>

          <div className="profil-wrapper">
            <div className="profil-detail">
              {props.children ? (
                props.children
              ) : (
                <div
                  className={
                    darkMode
                      ? "profil-main-wrapper bg-content-dark-mode "
                      : "profil-main-wrapper"
                  }
                >
                  <div
                    className={
                      darkMode
                        ? "profil-main-wrapper-toptitle bg-content-orange-dark-mode"
                        : "profil-main-wrapper-toptitle"
                    }
                  >
                    <h3
                      className={
                        darkMode ? "text-color-dark-mode" : "text-white"
                      }
                    >
                      <VscAccount /> My Profil
                    </h3>
                  </div>
                  <div className="profil-main-wrapper-title">
                    <h5 className={darkMode ? "text-color-dark-mode" : ""}>
                      <BiCommentDetail /> Detail
                    </h5>
                  </div>

                  <div className="profil-detail-main">
                    <ul>
                      <li
                        className={
                          darkMode ? "border-color-white-dark-mode" : ""
                        }
                      >
                        <p className="key">Nama</p>
                        <p className="value">
                          {auth.user.fullName}
                          {showNameEdit ? (
                            <MdClose
                              className="profil-edit profil-edit-name"
                              onClick={() => setShowNameEdit(!showNameEdit)}
                            />
                          ) : (
                            <BsPencil
                              className="profil-edit profil-edit-name"
                              onClick={() => setShowNameEdit(!showNameEdit)}
                            />
                          )}
                        </p>
                        <div
                          className={
                            showNameEdit
                              ? "profil-edit-input active"
                              : "profil-edit-input"
                          }
                        >
                          <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={
                              darkMode ? "input-all-dark-mode" : "input-all"
                            }
                            style={{
                              marginRight: "60px",
                              paddingRight: "50px",
                            }}
                          />
                          <form>
                            <button onClick={handleEditName}>
                              <VscSaveAs className="profil-edit-save-icon" />
                            </button>
                          </form>
                        </div>
                      </li>
                      <li
                        className={
                          darkMode ? "border-color-white-dark-mode" : ""
                        }
                      >
                        <p className="key">Umur</p>
                        <p className="value">
                          {auth.user.umur ? auth.user.umur : "?"}
                          {showUmur ? (
                            <MdClose
                              className="profil-edit profil-edit-name"
                              onClick={() => setShowUmur(!showUmur)}
                            />
                          ) : (
                            <BsPencil
                              className="profil-edit profil-edit-name"
                              onClick={() => setShowUmur(!showUmur)}
                            />
                          )}
                        </p>
                        <div
                          className={
                            showUmur
                              ? "profil-edit-input active"
                              : "profil-edit-input"
                          }
                        >
                          <Input
                            type="number"
                            value={umur}
                            onChange={(e) => setUmur(e.target.value)}
                            className={
                              darkMode ? "input-all-dark-mode" : "input-all"
                            }
                            style={{
                              marginRight: "60px",
                              paddingRight: "50px",
                            }}
                          />
                          <form>
                            <button onClick={handleEditUmur}>
                              <VscSaveAs className="profil-edit-save-icon" />
                            </button>
                          </form>
                        </div>
                      </li>
                      <li
                        className={
                          darkMode ? "border-color-white-dark-mode" : ""
                        }
                      >
                        <p className="key">Tanggal Lahir</p>
                        <p className="value">
                          {auth.user.tanggalLahir
                            ? auth.user.tanggalLahir
                            : "?"}
                          {showTanggalLahir ? (
                            <MdClose
                              className="profil-edit profil-edit-name"
                              onClick={() =>
                                setShowTanggalLahir(!showTanggalLahir)
                              }
                            />
                          ) : (
                            <BsPencil
                              className="profil-edit profil-edit-name"
                              onClick={() =>
                                setShowTanggalLahir(!showTanggalLahir)
                              }
                            />
                          )}
                        </p>
                        <div
                          className={
                            showTanggalLahir
                              ? "profil-edit-input active"
                              : "profil-edit-input"
                          }
                        >
                          <Input
                            type="date"
                            value={tanggalLahir}
                            onChange={(e) => setTanggalLahir(e.target.value)}
                            className={
                              darkMode ? "input-all-dark-mode" : "input-all"
                            }
                            style={{
                              marginRight: "60px",
                              paddingRight: "50px",
                            }}
                          />
                          <form>
                            <button onClick={handleEditTanggalLahir}>
                              <VscSaveAs className="profil-edit-save-icon" />
                            </button>
                          </form>
                        </div>
                      </li>
                      <li
                        className={
                          darkMode ? "border-color-white-dark-mode" : ""
                        }
                      >
                        <p className="key">Role</p>
                        <p className="value">{auth.user.role}</p>
                      </li>
                    </ul>
                  </div>

                  <div className="profil-main-wrapper-title">
                    <h5 className={darkMode ? "text-color-dark-mode" : ""}>
                      <MdPermContactCalendar /> Kontak
                    </h5>
                  </div>

                  <div className="profil-detail-main">
                    <ul>
                      <li
                        className={
                          darkMode ? "border-color-white-dark-mode" : ""
                        }
                      >
                        <p className="key">Email</p>
                        <p className="value">{auth.user.email}</p>
                      </li>
                      <li
                        className={
                          darkMode ? "border-color-white-dark-mode" : ""
                        }
                      >
                        <p className="key">No Telepon</p>
                        <p className="value">
                          {auth.user.telepon ? auth.user.telepon : "?"}
                          {showNoTelpon ? (
                            <MdClose
                              className="profil-edit profil-edit-name"
                              onClick={() => setShowNoTelpon(!showNoTelpon)}
                            />
                          ) : (
                            <BsPencil
                              className="profil-edit profil-edit-name"
                              onClick={() => setShowNoTelpon(!showNoTelpon)}
                            />
                          )}
                        </p>
                        <div
                          className={
                            showNoTelpon
                              ? "profil-edit-input active"
                              : "profil-edit-input"
                          }
                        >
                          <Input
                            type="number"
                            placeholder="contoh: 08997495709"
                            value={telepon}
                            onChange={(e) => setTelepon(e.target.value)}
                            className={
                              darkMode ? "input-all-dark-mode" : "input-all"
                            }
                            style={{
                              marginRight: "60px",
                              paddingRight: "50px",
                            }}
                          />
                          <form>
                            <button onClick={handleEditTelepon}>
                              <VscSaveAs className="profil-edit-save-icon" />
                            </button>
                          </form>
                        </div>
                      </li>
                      <li
                        className={
                          darkMode ? "border-color-white-dark-mode" : ""
                        }
                      >
                        <p className="key">Alamat</p>
                        <p className="value">
                          {auth.user.alamat ? auth.user.alamat : "?"}
                          {showAlamat ? (
                            <MdClose
                              className="profil-edit profil-edit-name"
                              onClick={() => setShowAlamat(!showAlamat)}
                            />
                          ) : (
                            <BsPencil
                              className="profil-edit profil-edit-name"
                              onClick={() => setShowAlamat(!showAlamat)}
                            />
                          )}
                        </p>
                        <div
                          className={
                            showAlamat
                              ? "profil-edit-input active"
                              : "profil-edit-input"
                          }
                        >
                          <Input
                            type="text"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            className={
                              darkMode ? "input-all-dark-mode" : "input-all"
                            }
                            style={{
                              marginRight: "60px",
                              paddingRight: "50px",
                            }}
                          />
                          <form>
                            <button onClick={handleEditAlamat}>
                              <VscSaveAs className="profil-edit-save-icon" />
                            </button>
                          </form>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={
              darkMode ? "profil-menu bg-content-dark-mode" : "profil-menu"
            }
          >
            <div className="profil-menu-wrapper">
              <div
                className={
                  darkMode
                    ? "profil-menu-title bg-content-orange-dark-mode"
                    : "profil-menu-title"
                }
              >
                <h5>
                  <AiOutlineLink /> Menu
                </h5>
              </div>
              <ul className="profil-menu-link">
                <li
                  className={
                    darkMode
                      ? "profil-item border-color-dark-mode"
                      : "profil-item"
                  }
                >
                  <NavLink
                    exact
                    className={
                      darkMode
                        ? "profil-link link-color-dark-mode"
                        : "profil-link"
                    }
                    to="/profil"
                  >
                    <CgProfile className="profil-menu-icon" /> My Profil
                  </NavLink>
                </li>
                <li
                  className={
                    darkMode
                      ? "profil-item border-color-dark-mode"
                      : "profil-item"
                  }
                >
                  <NavLink
                    className={
                      darkMode
                        ? "profil-link link-color-dark-mode"
                        : "profil-link"
                    }
                    to="/profil/password/ubah"
                  >
                    <VscKey className="profil-menu-icon" /> Ubah Password
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {auth.errorValidasi ? (
        <div className="message-validasi-error message-validasi">
          <div>
            <p className="message-validasi-text">
              <VscWarning className="message-validasi-icon" />{" "}
              {auth.errorValidasi}
            </p>
          </div>
        </div>
      ) : null}

      {auth.message ? (
        <div className="message-validasi-success message-validasi">
          <div>
            <p className="message-validasi-text">
              <BsCheckAll className="message-validasi-icon" /> {auth.message}
            </p>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}

export default Profil;

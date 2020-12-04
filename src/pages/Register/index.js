import React, { useEffect, useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap';
import { RegisterPage } from '../../assets';
import './style.css'
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, timeOutRegister } from '../../actions';
import { ImSpinner9 } from "react-icons/im";
import {FaCheck, FaRegUser} from 'react-icons/fa'
import {VscKey} from 'react-icons/vsc'
import {HiOutlineMail} from 'react-icons/hi'



function Register() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth)

    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userRegister = (e) => {
        e.preventDefault()

        const userForm = {
            fullName: nama,
            email,
            password
        }

        if (!user.error) {
            dispatch(register(userForm))
        }
    }


    useEffect(() => {
        if (user.error) {
            setTimeout(() => dispatch(timeOutRegister()), 4000)
        }

        if (user.message) {
            setTimeout(() => dispatch(timeOutRegister()), 4000)
        }
    }, [user])


    if(auth.authenticate){
        return <Redirect to="/" />
    }


    return (
        <>

            <div className="register">

                {
                    user.error.length > 0 ?
                        user.error.map((err, index) =>
                            <Alert key={index} variant="danger" className={`error-validasi active error-${index}`}>
                                <i className="dw dw-warning-1"></i>&nbsp;{err.msg}
                            </Alert>
                        ) : null
                }

                {
                    user.message ?
                        (
                            <Alert variant="success" className="success-validasi">< FaCheck/> {user.message}</Alert>
                        ) : null
                }

                <div className="container-fluid login-wrapper">
                    <Row className="auth-row">
                        <Col md="6">
                            <img className="register-page" src={RegisterPage} alt="" />
                        </Col>
                        <Col md="6" style={{ marginTop: '20px' }}>
                            <div className="register-box">
                                <div className="register-title">
                                    <h2>Daftar</h2>
                                </div>

                                <form>
                                    <div className="input-group form-group">
                                        <input type="text" placeholder="Nama" className="form-control nameInput" value={nama} onChange={(e) => setNama(e.target.value)} />
                                        <div className="input-group-icon">
                                            <span className="input-icon">
                                                <FaRegUser/>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="input-group form-group">
                                        <input type="text" placeholder="Email" className="form-control emailInput" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <div className="input-group-icon">
                                            <span className="input-icon" style={{ fontSize: "24px" }}>
                                                <HiOutlineMail/>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="input-group form-group">
                                        <input type="Masukan Kata Sandi" placeholder="Password" className="form-control passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <div className="input-group-icon">
                                            <span className="input-icon">
                                                <VscKey/>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button className="btn-blue btn-lg" onClick={userRegister}>
                                            {user.loading ? (<ImSpinner9 className="loading" />) : 'Daftar'}
                                        </button>
                                    </div>

                                    <p className="or-auth">OR</p>

                                    <div className="form-group">
                                        <Link to="/login" className="btn-blueOutline btn-sm">Sudah Punya Akun? Masuk</Link>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Register

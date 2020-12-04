import React, { useEffect, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login, timeOutLogin } from '../../actions';
import { LoginPage } from '../../assets';
import './style.css';
import { ImSpinner9 } from "react-icons/im";
import {VscKey} from 'react-icons/vsc'
import { FaRegUser } from 'react-icons/fa'

function Login() {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const userLogin = (e) => {
        e.preventDefault();

        const user = {
            email, password
        }

        if (!auth.error) {
            dispatch(login(user))
        }

    }

    useEffect(() => {
        if (auth.error) {
            setTimeout(() => dispatch(timeOutLogin()), 4000)
        }
    }, [auth])



    if(auth.authenticate){
        return <Redirect to="/" />
    }

    return (
        <>

            <div className="login">


                {
                    auth.error.length > 0 ?
                        auth.error.map((err, index) =>
                            <Alert key={index} variant="danger" className={`error-validasi active error-${index}`}>
                                <i className="dw dw-warning-1"></i>&nbsp;{err.msg}
                            </Alert>
                        ) : null
                }



                <div className="container-fluid login-wrapper">
                    <Row className="auth-row">
                        <Col md="6">
                            <img className="login-page" src={LoginPage} alt="" />
                        </Col>
                        <Col md="6" style={{ marginTop: '20px' }}>
                            <div className="login-box">
                                <div className="login-title">
                                    <h2>Masuk</h2>
                                </div>

                                <form>
                                    <div className="input-group form-group">
                                        <input type="text" placeholder="Email" className="form-control emailInput " value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <div className="input-group-icon">
                                            <span className="input-icon">
                                                <FaRegUser />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="input-group form-group">
                                        <input type="password" placeholder="Kata Sandi" className="form-control passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <div className="input-group-icon">
                                            <span className="input-icon">
                                               <VscKey/>

                                            </span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button className="btn-blue btn-lg" onClick={userLogin}>
                                            {auth.loading ? (<ImSpinner9 className="loading" />) : 'Masuk'}
                                        </button>
                                    </div>

                                    <p className="or-auth">OR</p>

                                    <div className="form-group">
                                        <Link to="/register" className="btn-blueOutline btn-sm">Belum Punya Akun? Daftar</Link>
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

export default Login

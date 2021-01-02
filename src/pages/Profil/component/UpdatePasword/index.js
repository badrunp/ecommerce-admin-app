import React from 'react'
import Profil from '../..'
import { VscKey } from 'react-icons/vsc'
import Input from '../../../../components/Ui/Input'
import './style.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../../../../actions'

function UpdatePassword() {

    const dispatch = useDispatch()
    const {darkMode} = useSelector(state => state.darkMode)
    const auth = useSelector(state => state.auth)

    const [password, setPassword] = useState('');
    const [passwordBaru, setPasswordBaru] = useState('');
    const [passwordKonfirm, setPasswordKonfirm] = useState('')
    const [eye, setEye] = useState(false)
    const [eye2, setEye2] = useState(false)
    const [eye3, setEye3] = useState(false)

    const [errorLength, setErrorLength] = useState(false)
    const [errorLength2, setErrorLength2] = useState(false)
    const [errorLength3, setErrorLength3] = useState(false)

    const handleUpdatePassword = (e) => {
        e.preventDefault()

        const data = {
            userId: auth.user._id,
            password: password,
            passwordBaru: passwordBaru,
            passwordKonfirm: passwordKonfirm
        }

        if(password === ""){
            setErrorLength(true)
        }

        if(passwordBaru === ""){
            setErrorLength2(true)
        }

        if(passwordKonfirm !== passwordBaru || passwordKonfirm === ""){
            setErrorLength3(true)
        }

        if(!errorLength && password.length > 0 && passwordBaru.length > 0 && !errorLength2 && passwordBaru === passwordKonfirm){
            dispatch(updatePassword(data))
        }
    }

    const handleKeyUp = (e) => {
        if (e.target.value.length <= 5) {
            setErrorLength(true)
        } else {
            setErrorLength(false)
        }
    }

    const handleKeyUp2 = (e) => {
        if (e.target.value.length <= 5) {
            setErrorLength2(true)
        } else {
            setErrorLength2(false)
        }
    }

    const handleKeyUp3 = (e) => {
        if(e.target.value !== passwordBaru){
            setErrorLength3(true)
        }else{
            setErrorLength3(false)
        }
    }

    return (
        <Profil>
            <div className={darkMode ? "profil-main-wrapper border-color-dark-mode bg-content-dark-mode" : "profil-main-wrapper"}>
                <div className={darkMode ? "profil-main-wrapper-toptitle bg-content-orange-dark-mode" : "profil-main-wrapper-toptitle"}>
                    <h2><VscKey /> Ubah Password</h2>
                </div>

                <div className={darkMode ? "form-ubah-password bg-content-dark-mode" : "form-ubah-password"}>
                    <form>
                    <div className="input-group form-group" style={{marginTop: "25px"}}>
                            {
                                eye ? (
                                    <input type="text" placeholder="Password" className={errorLength ? 'form-control passwordInput is-invalid-input' : password.length > 0 ? "form-control passwordInput is-valid-input" : `${darkMode ? "form-control passwordInput input-all-dark-mode" : "form-control passwordInput input-all"}`} value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={handleKeyUp} />
                                ) :
                                    (<input type="password" placeholder="Password" className={errorLength ? 'form-control passwordInput is-invalid-input' : password.length > 0 ? "form-control passwordInput is-valid-input" : `${darkMode ? "form-control passwordInput input-all-dark-mode" : "form-control passwordInput input-all"}`} value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={handleKeyUp} />)
                            }
                            <div className="input-group-icon">
                                <span className="input-icon">
                                    {
                                        !eye ?
                                            (<svg onClick={() => setEye(!eye)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eye-fill eye-password" fill="currentColor">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>) :
                                            (<svg onClick={() => setEye(!eye)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eye-slash-fill eye-password" fill="currentColor">
                                                <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z" />
                                                <path d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" />
                                            </svg>)
                                    }
                                </span>
                            </div>
                        </div>
                        {errorLength ? (<div style={{ display: 'block', margin: '-7px 0 10px 0' }} className="invalid-feedback">Password Minimal 6 Karakter</div>) : null}
                        
                        
                        <div className="input-group form-group" style={{marginTop: "25px"}}>
                            {
                                eye2 ? (
                                    <input type="text" placeholder="Password Baru" className={errorLength2 ? 'form-control is-invalid-input' : passwordBaru.length > 0 ? "form-control passwordInput is-valid-input" : `${darkMode ? "form-control passwordInput input-all-dark-mode" : "form-control passwordInput input-all"}`} value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} onKeyUp={handleKeyUp2} />
                                ) :
                                    (<input type="password" placeholder="Password Baru" className={errorLength2 ? 'form-control is-invalid-input' : passwordBaru.length > 0 ? "form-control passwordInput is-valid-input" : `${darkMode ? "form-control passwordInput input-all-dark-mode" : "form-control passwordInput input-all"}`} value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} onKeyUp={handleKeyUp2} />)
                            }
                            <div className="input-group-icon">
                                <span className="input-icon">
                                    {
                                        !eye2 ?
                                            (<svg onClick={() => setEye2(!eye2)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eye-fill eye-password" fill="currentColor">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>) :
                                            (<svg onClick={() => setEye2(!eye2)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eye-slash-fill eye-password" fill="currentColor">
                                                <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z" />
                                                <path d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" />
                                            </svg>)
                                    }
                                </span>
                            </div>
                        </div>
                        {errorLength2 ? (<div style={{ display: 'block', margin: '-7px 0 10px 0' }} className="invalid-feedback">Password Minimal 6 Karakter</div>) : null}
                        



                        <div className="input-group form-group" style={{marginTop: "25px"}}>
                            {
                                eye3 ? (
                                    <input type="text" placeholder="Konfirmasi Password" className={errorLength3 ? 'form-control passwordInput is-invalid-input' : passwordKonfirm.length > 0 ? "form-control passwordInput is-valid-input" : `${darkMode ? "form-control passwordInput input-all-dark-mode" : "form-control passwordInput input-all"}`} value={passwordKonfirm} onChange={(e) => setPasswordKonfirm(e.target.value)} onKeyUp={handleKeyUp3} />
                                ) :
                                    (<input type="password" placeholder="Konfirmasi Password" className={errorLength3 ? 'form-control passwordInput is-invalid-input' : passwordKonfirm.length > 0 ? "form-control passwordInput is-valid-input" : `${darkMode ? "form-control passwordInput input-all-dark-mode" : "form-control passwordInput input-all"}`} value={passwordKonfirm} onChange={(e) => setPasswordKonfirm(e.target.value)} onKeyUp={handleKeyUp3} />)
                            }
                            <div className="input-group-icon">
                                <span className="input-icon">
                                    {
                                        !eye3 ?
                                            (<svg onClick={() => setEye3(!eye3)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eye-fill eye-password" fill="currentColor">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>) :
                                            (<svg onClick={() => setEye3(!eye3)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eye-slash-fill eye-password" fill="currentColor">
                                                <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z" />
                                                <path d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" />
                                            </svg>)
                                    }
                                </span>
                            </div>
                        </div>
                        {errorLength3 ? (<div style={{ display: 'block', margin: '-7px 0 10px 0' }} className="invalid-feedback">Konfirmasi Password Tidak Sesuai</div>) : null}
                        

                        <button className="btn-ubah-password" onClick={handleUpdatePassword}>Ubah Password</button>
                    </form>
                </div>
            </div>
        </Profil>
    )
}

export default UpdatePassword

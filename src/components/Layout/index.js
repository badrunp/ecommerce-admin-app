import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chat from '../Chat'
import Navbar from '../Navbar'
import Sidebar from '../SIdebar'
import './style.css'

function Layout(props) {

    const sidebar = useSelector(state => state.sidebar)
    const {darkMode} = useSelector(state => state.darkMode)

    return (
        <>
            <Chat />
            <Sidebar />
            <Navbar />
            <div className={sidebar.sidebar ? `${darkMode ? 'layout-container active bg-dark-mode' : 'layout-container active'}` : `${darkMode ? 'layout-container bg-dark-mode' : 'layout-container'}` }>
                {props.children}

                <footer className={darkMode ? "footer bg-white bg-content-dark-mode" : "footer bg-white"}>
                    <div className={darkMode ? "copyright bg-content-dark-mode" : "copyright"}>
                        <p className={darkMode ? "text-color-dark-mode" : ""}>
                            &copy; <span>2021</span> Copyright Duos Dev | All Rights Reserved
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}
export default Layout
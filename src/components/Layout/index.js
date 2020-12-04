import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Navbar'
import Sidebar from '../SIdebar'

function Layout(props) {

    const sidebar = useSelector(state => state.sidebar)

    return (
        <>
            <Sidebar />
            <Navbar />
            <div className={sidebar.sidebar ? 'layout-container active' : 'layout-container'}>
                {props.children}
            </div>
        </>
    )
}
export default Layout
import React, { useState } from 'react';
import { DuosDev, sidebarImage } from '../../assets';
import './style.css';
import { GoHome, GoDashboard } from 'react-icons/go'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { RiHandbagLine } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs'
import { FiAirplay, FiMenu } from 'react-icons/fi'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdFlame } from 'react-icons/io'

function Sidebar() {

    const dispatch = useDispatch();
    const sidebar = useSelector(state => state.sidebar)



    return (
        <>
            <div className={sidebar.sidebar ? 'sidebar active' : 'sidebar'}>
                <div className="sidebar-wrapper">
                    <div className="sidebar-logo">
                        <ul className="sidebar-logo-wrapper">
                            <li>
                                <NavLink to="/" className="box-sidebar-logo">
                                    <div className="box-icon">
                                        <IoMdFlame className="icon-flame" />
                                    </div>
                                    <span className="sidebar-brand-name">Duos<span>Dev</span></span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar

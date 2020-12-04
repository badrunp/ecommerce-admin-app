import React, { useState } from 'react';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch } from 'react-icons/bs'
import { profilUser } from '../../assets';
import { IoMdArrowDropdown, IoIosNotifications, IoIosClose } from 'react-icons/io'
import { closeSidebarMenu, logout } from '../../actions';
import { ImSpinner9 } from 'react-icons/im'
import { FiMenu } from 'react-icons/fi'
import { HiMenuAlt2 } from 'react-icons/hi'
import { FaUser } from 'react-icons/fa'
import { AiTwotoneSetting } from 'react-icons/ai'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import Input from '../Ui/Input';



function Navbar() {
    const sidebar = useSelector(state => state.sidebar)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const [clearSearchValue, setClearSearchValue] = useState(false)
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    const handleSearchInput = (e) => {
        if (e.target.value.length > 0) {
            setClearSearchValue(true)
        } else {
            setClearSearchValue(false)
        }
    }

    const clearInputSearch = (e) => {
        setSearch('');
        setClearSearchValue(false)
        console.log(e);
    }

    const logoutUser = () => {
        dispatch(logout())
    }

    return (
        <>
            {/* { auth.loading ? (<div className="loading-2"><ImSpinner9 className="loading-2-icon" /></div>) : null} */}
            <div className="navbarMenu">
                <div className={sidebar.sidebar ? 'navbar-container active' : 'navbar-container'}>
                    <div className="navbar-left">
                        <div className="navbar-menu-icon">
                            {sidebar.sidebar ? (<HiMenuAlt2 onClick={() => dispatch(closeSidebarMenu())} className="menu-icon" />) :
                                (<HiMenuAlt2 onClick={() => dispatch(closeSidebarMenu())} className="menu-icon" />)}
                        </div>

                        <div className="navbar-search">
                            <div className="box-search">
                                <Input
                                    style={{ padding: '0 0 0 50px', height: '50px', fontSize: '18px', width: '100%'}}
                                    iconLeft={<BsSearch className="iconLeft" />}
                                    type="text"
                                    placeholder="Search"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    icon={searchInput.length > 0 ? (<IoIosClose className="icon-input-clear search-big" onClick={() => setSearchInput('')} />) : null}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="navbar-right">
                        <div className="navbar-notifikasi">
                            <div className="box-notifikasi-icon">
                                <IoIosNotifications className="notifikasi-icon" />
                            </div>
                        </div>
                        <div className="navbar-user-info">
                            <div className={dropdown ? 'user-info active' : 'user-info'}>
                                <div className="user-image">
                                    <img src={profilUser} alt="" />
                                </div>
                                <div className="user-name" onClick={() => setDropdown(!dropdown)}>
                                    <p>Muhamad badrun</p>
                                </div>
                                <div className="user-icon">
                                    <IoMdArrowDropdown onClick={() => setDropdown(!dropdown)} />
                                </div>
                            </div>

                            <div className={dropdown ? 'user-dropdown active' : 'user-dropdown'}>
                                <div className="user-dropdown-info">
                                    <img src={profilUser} alt="" />
                                    <div className="box-user-info">
                                        <h5>Putri Nadia Hermawan</h5>
                                        <p>badrun@gmail.com</p>
                                    </div>
                                </div>
                                <div className="user-dropdown-menu">
                                    <button> <FaUser className="icon-dropdown" /> Profil Saya</button>
                                    <button> <AiTwotoneSetting className="icon-dropdown" /> Pengaturan</button>
                                </div>
                                <div className="user-logout">
                                    <button><RiLogoutBoxRLine className="icon-dropdown" />Keluar Akun</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={dropdown ? 'dropdown-close active' : 'dropdown-close'} onClick={() => setDropdown(!dropdown)}></div>

        </>
    )
}

export default Navbar

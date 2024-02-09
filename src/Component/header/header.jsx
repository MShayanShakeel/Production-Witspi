import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import { useSelector, useDispatch } from "react-redux";
import { setSideBarState } from '../../store/sideBarSlice';
import Select from 'react-select';
import CountryFlag from 'react-country-flag';

export const defaultImageUrl = 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png';

const HeaderComponent = () => {

    const userDetails = useSelector((state) => state.userInfoStore.userDetails.userObj);
    const userName = userDetails?.name;

    const languages = [
        { id: 1, name: 'English', flag: 'us' },
        { id: 2, name: 'Spanish', flag: 'es' },
        { id: 3, name: 'French', flag: 'fr' },
        { id: 4, name: 'German', flag: 'de' },
        { id: 5, name: 'Italian', flag: 'it' },
    ];

    const isSidebarOpen = useSelector((state) => state.sideBarStore.stateSideBar);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 820);
    const [isSidebarOpenState, setIsSidebarOpenState] = useState(isMobileView ? false : true);
    const toggleSidebar = () => {
        setIsSidebarOpenState(!isSidebarOpenState);
        dispatch(setSideBarState(!isSidebarOpenState));
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };
    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    // Listen to window resize events to update isMobileView
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 820);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            {/* {isMobileView && (
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </Navbar.Toggle>
            )} */}
            <Navbar bg="light" expand="lg" className={`fixed-top main-Nav ${!isSidebarOpen ? 'sidebar-open' : ''}`}>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" style={{ backgroundColor: 'white', borderRadius: "10px" }}>
                    <Nav className="ml-auto profile-info">
                        <div className="language-dropdown">
                            <Select
                                value={selectedLanguage}
                                options={languages}
                                onChange={handleLanguageChange}
                                getOptionLabel={(option) => (
                                    <div>
                                        <CountryFlag countryCode={option.flag} svg />
                                        {option.name}
                                    </div>
                                )}
                                getOptionValue={(option) => option.name}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', // Remove the border
                                    }),
                                }}
                            />
                        </div>
                        <div className="user-icon" onClick={toggleUserDropdown}>
                            <img src="data:image/png;base64,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" alt=""
                                className='user-icon'
                            />
                            <span>
                                {userName}
                            </span>
                            {isUserDropdownOpen && (
                                <div className="dropdown-menu show-on-hover">
                                    <a class="dropdown-item" href="/profile">
                                        {/* <img src={defaultImageUrl} alt="user" className='list-img-icons' /> */}
                                        Account
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" onClick={() => {
                                        localStorage.removeItem("token")
                                        window.location.href = "/";
                                    }}>
                                        {/* <img src={defaultImageUrl} alt="user" className='list-img-icons' /> */}
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
                {isMobileView && (
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar}>
                        {isSidebarOpenState ? (
                            <span style={{ color: 'black' }}>╳</span>
                        ) : !isSidebarOpenState ? (
                            <>
                                <FontAwesomeIcon style={{ color: 'black' }} icon={faBars} />
                            </>
                        ) : null}
                    </Navbar.Toggle>
                )}
            </Navbar>
            {isSidebarOpen && windowWidth <= 820 ? <Sidebar onClick={toggleSidebar} /> : <Sidebar />}
            <Outlet />
        </>
    );
};

export default HeaderComponent;

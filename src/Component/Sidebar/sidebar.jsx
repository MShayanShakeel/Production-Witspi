import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCog, faUsers, faCross, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import { useSelector, useDispatch } from "react-redux";
import { setSideBarState } from '../../store/sideBarSlice';
import img1 from "../../../images/watspilogo.png"
const Sidebar = () => {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.sideBarState);
    const dispatch = useDispatch();
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    
    const handleToggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    const toggleSidebar = () => {
        dispatch(setSideBarState(isSidebarOpen));
    };

    // Add a function to handle link clicks in mobile view
    const handleLinkClick = (path) => {
        if (window.innerWidth <= 820) {
            toggleSidebar(); // Close the sidebar
        }
        history.push(path); // Navigate to the specified path
    };

    return (
        <>
            {!isSidebarOpen && (
                <div className="its-heading-logo">
                    <img src={img1} alt="ITS Logo" className="its-logo" />
                    {/* <h1 className="its-heading">WatsApi</h1> */}
                    {/* {isMobileView && (
                        <div className="cross-button" onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={isSidebarOpen ? faCross : ''} />
                        </div>
                    )} */}
                </div>
            )}
            <nav id="sidebar" className={!isSidebarOpen ? "active" : ""}>
                <div className="p-4 mr-top">
                    <ul className="list-unstyled">
                        <h6 className='heading-style'>MAIN MENU</h6>
                        <Nav.Link href="/dashboard" className={`mb-2 main-sidebar ${window.location.pathname === '/dashboard' ? 'active-link' : ''}`}
                            onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Dashboard
                            </span>
                        </Nav.Link>
                        {/* <Nav.Link href="/instancePage" className={`mb-2 main-sidebar ${window.location.pathname === '/instancePage' ? 'active-link' : ''}`}
                            onClick={toggleSidebar} >
                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                InstancePage
                            </span>
                        </Nav.Link> */}
                        <Nav.Link href="/instances" className={`mb-2 main-sidebar ${window.location.pathname === '/instances' ? 'active-link' : ''}`}
                            onClick={toggleSidebar} >
                            <FontAwesomeIcon icon={faUsers} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Instances
                            </span>
                        </Nav.Link>

                        <Nav.Link
                            className={`mb-2 main-sidebar`}
                            onClick={handleToggleSubMenu}
                        >
                            <FontAwesomeIcon icon={faUsers} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                BroadCast
                            </span>
                            <FontAwesomeIcon icon={isSubMenuOpen} className="ml-auto submenu-icon" />
                        </Nav.Link>
                        <Nav className={`submenu ${isSubMenuOpen ? 'submenu-open' : ''}`}>
                            <Nav.Link href="/broadCast" className={`mb-2 main-sidebar submenuItem ${window.location.pathname === '/broadCast' ? 'active-link' : ''}`} onClick={toggleSidebar}>
                                Create BroadCast
                            </Nav.Link>
                            <Nav.Link href="/mybroadCast" className={`mb-2 main-sidebar submenuItem ${window.location.pathname === '/mybroadCast' ? 'active-link' : ''}`} onClick={toggleSidebar}>
                                My BroadCast
                            </Nav.Link>
                        </Nav>
                        <Nav.Link href="/myContact" className={`mb-2 main-sidebar ${window.location.pathname === '/myContact' ? 'active-link' : ''}`}
                            onClick={toggleSidebar} >
                            <FontAwesomeIcon icon={faAddressBook} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                My Contact
                            </span>
                        </Nav.Link>
                        <Nav.Link href="/groups" className={`mb-2 main-sidebar ${window.location.pathname === '/groups' ? 'active-link' : ''}`}
                            onClick={toggleSidebar} >
                            <FontAwesomeIcon icon={faUsers} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Groups
                            </span>
                        </Nav.Link>

                    </ul>
                    <ul className="list-unstyled">
                        <h6 className='heading-style'>OTHERS</h6>
                        <Nav.Link href="/settings" className={`mb-2 main-sidebar ${window.location.pathname === '/settings' ? 'active-link' : ''}`} onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faCog} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Setting
                            </span>
                        </Nav.Link>
                    </ul>
                </div>
            </nav>

        </>
    );
};

export default Sidebar;

import React, { useState } from 'react';
import ChartPage from './Chart/ChartPage';
import { Card } from 'react-bootstrap';
import "./dashboard.css";
import Messages from './Messages/Messages';
import { useSelector } from "react-redux";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Nav } from 'react-bootstrap';

function Dashboard() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);
    console.log(localStorage.getItem("token"))
    const userDetails = useSelector((state) => state.userInfoStore.userDetails.userObj);
    console.log(userDetails)
    return (
        <>
            <div className={`main-table-class ${!isSidebarOpen ? 'trades-open' : ''}`}>
                <div style={{ marginTop: "6rem" }}></div>
                <div className='main-bg-pd-10px'>
                    <Card className='card-border-none br-10'>
                        <div style={{ padding: "20px" }}>
                            <h4 style={{ fontWeight: "600" }}>Area Spaline Chart</h4>
                        </div>
                        <ChartPage />
                    </Card>
                    <div className='pd-tb-30'>
                        {/* className='card-border-none' */}
                        <Messages />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;

import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Sidebar2 from './Sidebar/Sidebar2';
import DashBoardComponent from './DashComponent/DashBoardComponent';
import MainInstance from './MainInstanceComp/MainInstance';
import bgImg from "../../../images/bg2.jpg";
import bgImg1 from "../../../images/bg1.jpg";
import Headerprofile from '../Header-profile/Headerprofile';
import '../../Component/Dashboard2/MainInstanceComp/MainInstance.css'
import { useState } from 'react';

function Dashboard2() {
    const [headerShowInMobile , setHeaderShowInMobile] = useState(window.innerWidth <= 500);

    const handleHeaderShow = () => {
        setHeaderShowInMobile(window.innerWidth <= 500);
    }
    window.addEventListener('resize' , handleHeaderShow);
    return (
        <>
            <div style={{
                backgroundImage: `url(https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg)`,
                width: "100%",
                height: "100vh",
                overflow: 'hidden',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <Row className='Home-main-row' style={{padding: "3vh 4.5vh 3vh 0px"}}>
            {headerShowInMobile ? (
                <Col style={{marginTop : "6vh"}} sm="12" md="7" lg="7" xl="7" xxl="7">
                <Headerprofile />
                    </Col>
            ) : (<p></p>)
            }      
                    <Col sm="12" md="1" lg="1" xl="1" xxl="1">
                        <Sidebar2 />
                    </Col>
                    <Col sm="12" md="7" lg="7" xl="7" xxl="7">
                        <DashBoardComponent />
                    </Col>
                    <Col sm="12" md="4" lg="4" xl="4" xxl="4">
                   
                        <MainInstance />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Dashboard2

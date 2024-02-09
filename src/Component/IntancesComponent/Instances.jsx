import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCog, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from "react-redux";
import GetALLInstances from '../../helpers/GetApis/GetALLInstance';
import GetIndiInstance from '../../helpers/GetApis/GetIndiInstance';
import "./Intances.css"
import DelIndiInstance from '../../helpers/GetApis/DelIndiInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateInstanceApi from '../../helpers/PostApis/CreateInstance';
import { useDispatch } from "react-redux";
import { setSelectedInstanceId } from '../../store/intanceSettingSlice';
import { Link } from 'react-router-dom';

function Instances() {
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);
    const selectedInstanceId = useSelector((state) => state.userSetting.selectedInstanceId);
    console.log(selectedInstanceId, "as")

    const userDetails = useSelector((state) => state.userInfoStore.userDetails.userObj);
    console.log(userDetails)
    const userId = userDetails?._id;

    const [instancesData, setInstancesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [indiInstanceData, setIndiInstanceData] = useState(null);

    const [createInstance, setCreateInstance] = useState('');
    const [markIncomingMessagesReaded, setMarkIncomingMessagesReaded] = useState(false);
    const [markIncomingMessagesReadedOnReply, setMarkIncomingMessagesReadedOnReply] = useState(false);
    const [keepOnlineStatus, setKeepOnlineStatus] = useState(true);
    const [webhookUrl, setWebhookUrl] = useState('https://mysite.com/webhook/green-api/');
    const [outgoingAPIMessageWebhook, setOutgoingAPIMessageWebhook] = useState(true);
    const [outgoingWebhook, setOutgoingWebhook] = useState(true);
    const [deviceWebhook, setDeviceWebhook] = useState(true);
    const [stateWebhook, setStateWebhook] = useState(true);
    const [outgoingMessageWebhook, setOutgoingMessageWebhook] = useState(true);
    const [incomingWebhook, setIncomingWebhook] = useState(true);
    const [delaySendMessagesMilliseconds, setDelaySendMessagesMilliseconds] = useState(1000);
    const [enableMessagesHistory, setEnableMessagesHistory] = useState(false);

    //ALL instances
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetALLInstances(userId);
                setInstancesData(data?.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);

    //INDI Instance VIEW
    const fetchIndividualInstanceData = async (instanceId) => {
        try {
            const userDetails = await GetIndiInstance(instanceId);
            if (userDetails && userDetails.message) {
                const data = userDetails.message;
                setIndiInstanceData(data);
                setShowModal(true); // Show the modal once data is fetched
            } else {
                console.error('No valid data found in the response:', userDetails);
            }
        } catch (error) {
            console.error('Error fetching individual instance data:', error);
        }
    };
    const deleteInstance = async (instanceId) => {
        try {
            await DelIndiInstance(instanceId);
            // Remove the deleted instance from the state
            setInstancesData((prevData) => prevData?.filter((instance) => instance?._id !== instanceId));
            setShowDelModal(false);
            toast.success('Instance deleted successfully', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error deleting instance:', error);
        }
    };
    // Function to close the modal
    const handleCloseModal = () => {
        setShowDelModal(false)
        setShowModal(false);
    };

    //----Create Instance
    const handleSaveInput = () => {
        const randomNames = ["Ali", "Smith", "Johnson", "Brown", "Taylor", "Williams", "Huzaifa", "Saad", "Emma", "Liam",
            "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper"];

        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
        const data = {
            webhookUrl,
            delaySendMessagesMilliseconds,
            markIncomingMessagesReaded: JSON.stringify(markIncomingMessagesReaded),
            markIncomingMessagesReadedOnReply: JSON.stringify(markIncomingMessagesReadedOnReply),
            keepOnlineStatus: JSON.stringify(keepOnlineStatus),
            outgoingAPIMessageWebhook: JSON.stringify(outgoingAPIMessageWebhook),
            outgoingWebhook: JSON.stringify(outgoingWebhook),
            deviceWebhook: JSON.stringify(deviceWebhook),
            stateWebhook: JSON.stringify(stateWebhook),
            outgoingMessageWebhook: JSON.stringify(outgoingMessageWebhook),
            incomingWebhook: JSON.stringify(incomingWebhook),
            userId: userId,
            InstancesName: randomName,
            InstancesPhone: +92345678910,
            enableMessagesHistory: JSON.stringify(enableMessagesHistory)
        };

        CreateInstanceApi(data)
            .then((response) => {
                setCreateInstance(response?.data)
                console.log("API response:", response?.data);
                toast.success('Instance Created successfully', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                console.error("API error:", error);
            });
    };
    //----Ends Create Instance

    const handleLinkClick = () => {
        dispatch(setSelectedInstanceId(instance?._id));
    };
    return (
        <>
            <ToastContainer />
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Individual Instance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {indiInstanceData && (
                        <>
                            <div style={{ textAlign: 'center' }}>
                                <h6>{indiInstanceData.InstancesName}</h6>
                                <h6>{indiInstanceData.InstancesPhone}</h6>
                                <h6>{indiInstanceData?.webhookUrl}</h6>
                                <h6>{indiInstanceData?.delaySendMessagesMilliseconds}</h6>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Del Modal */}
            <Modal show={showDelModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Instance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You Sure You want to Delete selected Instance
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => {
                        deleteInstance(selectedInstanceId);
                        setShowDelModal(false)
                    }}
                    >
                        Delete
                    </Button>
                    <Button variant='light' onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >

            <div className={`${!isSidebarOpen ? 'trades-open' : ''}`}>
                <div style={{ marginTop: "6rem" }}></div>
                <Row className='pd-20 pd-10-mob'>
                    <Col className='pd-mob-instances'>
                        <Card className='card-msg-border' style={{ borderRadius: "10px" }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: "10px 0" }}>
                                <h4 style={{ fontWeight: "600" }}>
                                    Instances
                                </h4>
                                <Button className='create-instance'
                                    onClick={handleSaveInput}
                                >
                                    Create Instance
                                </Button>
                            </div>
                            {instancesData?.map((instance) => (
                                <Card key={instance._id}>
                                    <div className='main-msg'>
                                        <div className='Main-Profile-flex'>
                                            <div className='Profile-style'>
                                                <img src="data:image/png;base64,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" alt=""
                                                    className='image-style'
                                                />
                                                <div className='Profile-flex'>
                                                    <div style={{ fontWeight: "600" }}>
                                                        <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#23ad4f", paddingRight: "2px" }} />
                                                        {instance?.InstancesName}
                                                    </div>
                                                    <div>
                                                        {instance?.InstancesPhone}
                                                    </div>
                                                    {instance?.keepOnlineStatus ? (
                                                        <>
                                                            <div className='intances-success-badge intances-success-mob'>
                                                                Connected
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className='red-badge'>
                                                                Not Connected
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='main-status'>
                                                <div className='main-status-col'>
                                                    <span className='font-style-status'>
                                                        {instance?.delaySendMessagesMilliseconds}
                                                    </span>
                                                    <span className='cl-light-grey'>
                                                        pending Chats
                                                    </span>
                                                </div>
                                                <div className='main-status-col'>
                                                    <span className='font-style-status'>
                                                        1000
                                                    </span>
                                                    <span className='cl-light-grey'>
                                                        Group Members
                                                    </span>
                                                </div>
                                                <div className='main-status-col'>
                                                    <span className='font-style-status'>
                                                        0
                                                    </span>
                                                    <span className='cl-light-grey'>
                                                        Archive Chats
                                                    </span>
                                                </div>
                                                <div className='main-status-col'>
                                                    <span className='font-style-status'>
                                                        999
                                                    </span>
                                                    <span className='cl-light-grey'>
                                                        Groups
                                                    </span>
                                                </div>
                                                <div className='main-status-col'>
                                                    <span className='font-style-status'>
                                                        100
                                                    </span>
                                                    <span className='cl-light-grey'>
                                                        Contacts
                                                    </span>
                                                </div>
                                                <div className='main-status-col'>
                                                    <span className='font-style-status'>
                                                        10
                                                    </span>
                                                    <span className='cl-light-grey'>
                                                        Active Chats
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='icon-style-flex'>
                                                <div className='connected-mob-badge'>
                                                    Connected
                                                </div>
                                                <div className='msgs-icons-mob'>
                                                    <FontAwesomeIcon icon={faTrash} className='pd-lr-10 svg-style'
                                                        onClick={() => {
                                                            dispatch(setSelectedInstanceId(instance?._id));
                                                            setShowDelModal(true)
                                                        }}
                                                    />
                                                    <Link
                                                        to={`/instancePage/${instance?._id}`}
                                                        onClick={() => {
                                                            dispatch(setSelectedInstanceId(instance?._id));
                                                            console.log('Dispatched setSelectedInstanceId with ID:', instance?._id);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCog}
                                                            className='pd-lr-10 svg-style'
                                                            style={{ color: 'black' }}
                                                        />
                                                    </Link>
                                                    <FontAwesomeIcon icon={faChartBar} className='pd-lr-10 svg-style'
                                                    // onClick={() => {
                                                    //     dispatch(setSelectedInstanceId(instance?._id));
                                                    //     fetchIndividualInstanceData(instance?._id);
                                                    //     setShowModal(true)
                                                    // }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Instances

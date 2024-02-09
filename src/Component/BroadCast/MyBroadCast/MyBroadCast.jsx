import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Button, Table, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./myBroadCast.css";
import {
    faPaperclip,
    faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
function MyBroadCast() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);
    const [showModal, setShowModal] = useState(false);
    const [showMessagesModal, setShowMessagesModal] = useState(false);

    const [templates, setTemplates] = useState([
        { textMessage: '' },
        { textMessage: '' },
        { textMessage: '' },
    ]);
    const attachmentInputs = useRef(Array(templates.length).fill(null));
    const [attachmentFiles, setAttachmentFiles] = useState(Array(templates.length).fill(null));

    const handleAddTemplate = () => {
        // Create a new message template object or any data structure you prefer
        const newTemplate = {
            textMessage: '',
            // Add other properties as needed
        };

        // Update your state or an array that holds message templates
        setTemplates([...templates, newTemplate]);
    };

    const handleTemplateChange = (e, index) => {
        const updatedTemplates = [...templates];
        updatedTemplates[index].textMessage = e.target.value;
        setTemplates(updatedTemplates);
    };

    const handleAttachmentSelect = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const allowedFileTypes = ['.pdf', '.doc', '.docx', '.mp3', '.wav', '.mp4', '.jpg', '.jpeg', '.png', '.svg']; // Specify the allowed file types
            const fileExtension = file.name.split('.').pop(); // Get the file extension

            if (allowedFileTypes.includes('.' + fileExtension.toLowerCase())) {
                const updatedAttachmentFiles = [...attachmentFiles];
                updatedAttachmentFiles[index] = file;
                setAttachmentFiles(updatedAttachmentFiles);

                // Extract and display only the file name without the full path
                const fileName = file.name;
                const updatedTemplates = [...templates];
                updatedTemplates[index].attachmentFileName = fileName;
                setTemplates(updatedTemplates);
            } else {
                alert('Please select a valid multimedia file (PDF, DOC, or DOCX).');
                e.target.value = null;
            }
        }
    };
    const openModal = (data) => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    //Message Modal
    const openMessagesModal = () => {
        setShowMessagesModal(true);
    };

    const closeMessagesModal = () => {
        setShowMessagesModal(false);
    };

    return (
        <>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact List</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: "0" }}>
                    <Table className='Tb-modal-pd-rem'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Phone</th>
                                <th>
                                    <button className='btn-contact-style'
                                        onClick={openMessagesModal}
                                    >
                                        Messages
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Huzaifa</td>
                                <td>Kkhan</td>
                                <td>+92098765431</td>
                                <td>+92098765431</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Huzaifa</td>
                                <td>Kkhan</td>
                                <td>+92098765431</td>
                                <td>+92098765431</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Huzaifa</td>
                                <td>Kkhan</td>
                                <td>+92098765431</td>
                                <td>+92098765431</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="close-btn" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showMessagesModal} onHide={closeMessagesModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Messages</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='message-templates-col-container'>
                        {/* To add a new template */}
                        {templates.map((template, index) => (
                            <div className='card-MybdCast' key={index}>
                                <form id={`form-file-upload-${index}`}>
                                    <label id={`text-upload-${index}`} htmlFor={`input-file-upload-${index}`} style={{ width: '100%' }}>
                                        <div className='text-area-main'>
                                            <textarea
                                                type='text'
                                                placeholder='Enter your message...'
                                                className='input-instance'
                                                value={template?.textMessage}
                                                onChange={(e) => handleTemplateChange(e, index)}
                                                style={{ border: 'none', backgroundColor: 'white', resize: 'none', height: "12vh" }}
                                            />

                                            <div>
                                                <span className='file-styleMybd'>{template.attachmentFileName}</span>   {/* Display file name */}
                                                <Button
                                                    className='Add-new-btn mybtn-file'
                                                    onClick={() => attachmentInputs[index].click()} // Trigger file input click
                                                >
                                                    <FontAwesomeIcon icon={faPaperclip} />
                                                </Button>

                                                <input
                                                    type='file'
                                                    accept='.pdf, .doc, .docx, .mp3, .wav, .mp4, .jpg, .jpeg, .png, .svg'  // Specify the allowed file types here
                                                    onChange={(e) => handleAttachmentSelect(e, index)}
                                                    style={{ display: 'none' }} // Hide the input element
                                                    ref={(input) => (attachmentInputs[index] = input)}
                                                />
                                            </div>
                                        </div>
                                    </label>
                                </form>
                            </div>
                        ))}
                        {/* To add a new template end */}
                        <div style={{ display: 'flex', width: "100%" }}>
                            <Button className='close-btn' onClick={handleAddTemplate}
                                style={{ width: "100%", margin: "0" }}
                            >
                                <FontAwesomeIcon icon={faArrowDown} />
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='close-btn' onClick={closeMessagesModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={`${!isSidebarOpen ? 'trades-open' : ''}`}>
                <div style={{ marginTop: '6rem' }}></div>
                <Row className='myBroadCast-main'>
                    <Col>
                        <div className='card-drop-style'>
                            <h2 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600' }}>
                                My BroadCast
                            </h2>
                        </div>
                        <Card className='card-box-border myborder-shadow-style'>
                            <Table className='Table-head' style={{ tableLayout: "fixed" }}>
                                <thead>
                                    <tr>
                                        <th>
                                            Date&Time
                                        </th>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            <button className='btn-contact-style'
                                                onClick={openModal}
                                            >
                                                Contacts
                                            </button>
                                        </th>
                                        <th>
                                            Instances
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                            </Table>
                        </Card>
                        <Card div className='card-box-border myborder-list-style'>
                            <Table className='Table-head tbody-table' style={{ tableLayout: "fixed" }}>
                                <tbody>
                                    <th style={{ width: "20%" }} className='ft-weight-300'>
                                        00-09-2023 23:37:33
                                    </th>
                                    <th style={{ width: "19%" }} className='ft-weight-300'>
                                        TechOn Ventures
                                    </th>
                                    <th className='ft-weight-300'>
                                        +92345678901
                                    </th>
                                    <th className='ft-weight-300'>
                                        Instance 1, Instance 2
                                    </th>
                                    <th className='ft-weight-300 txt-center'>
                                        <span className="badge badge-secondary badge-style mob-display-act">Active</span>
                                    </th>
                                </tbody>
                            </Table>
                        </Card>
                        <Card div className='card-box-border myborder-list-style'>
                            <Table className='Table-head tbody-table' style={{ tableLayout: "fixed" }}>
                                <tbody>
                                    <th style={{ width: "20%" }} className='ft-weight-300'>
                                        00-09-2023 23:37:33
                                    </th>
                                    <th style={{ width: "19%" }} className='ft-weight-300'>
                                        TechOn Ventures
                                    </th>
                                    <th className='ft-weight-300'>
                                        +92345678901
                                    </th>
                                    <th className='ft-weight-300'>
                                        Instance 1, Instance 2
                                    </th>
                                    <th className='ft-weight-300 txt-center'>
                                        <span className="badge badge-secondary badge-style mob-display-act">Active</span>
                                    </th>
                                </tbody>
                            </Table>
                        </Card>
                        <Card div className='card-box-border myborder-list-style'>
                            <Table className='Table-head tbody-table' style={{ tableLayout: "fixed" }}>
                                <tbody>
                                    <th style={{ width: "20%" }} className='ft-weight-300'>
                                        00-09-2023 23:37:33
                                    </th>
                                    <th style={{ width: "19%" }} className='ft-weight-300'>
                                        TechOn Ventures
                                    </th>
                                    <th className='ft-weight-300'>
                                        +92345678901
                                    </th>
                                    <th className='ft-weight-300'>
                                        Instance 1, Instance 2
                                    </th>
                                    <th className='ft-weight-300 txt-center'>
                                        <span className="badge badge-secondary badge-style mob-display-act">Active</span>
                                    </th>
                                </tbody>
                            </Table>
                        </Card>
                        <Card div className='card-box-border myborder-list-style'>
                            <Table className='Table-head tbody-table' style={{ tableLayout: "fixed" }}>
                                <tbody>
                                    <th style={{ width: "20%" }} className='ft-weight-300'>
                                        00-09-2023 23:37:33
                                    </th>
                                    <th style={{ width: "19%" }} className='ft-weight-300'>
                                        TechOn Ventures
                                    </th>
                                    <th className='ft-weight-300'>
                                        +92345678901
                                    </th>
                                    <th className='ft-weight-300'>
                                        Instance 1, Instance 2
                                    </th>
                                    <th className='ft-weight-300 txt-center'>
                                        <span className="badge badge-secondary badge-style mob-display-act">Active</span>
                                    </th>
                                </tbody>
                            </Table>
                        </Card>
                        <Card div className='card-box-border myborder-list-style'>
                            <Table className='Table-head tbody-table' style={{ tableLayout: "fixed" }}>
                                <tbody>
                                    <th style={{ width: "20%" }} className='ft-weight-300'>
                                        00-09-2023 23:37:33
                                    </th>
                                    <th style={{ width: "19%" }} className='ft-weight-300'>
                                        TechOn Ventures
                                    </th>
                                    <th className='ft-weight-300'>
                                        +92345678901
                                    </th>
                                    <th className='ft-weight-300'>
                                        Instance 1, Instance 2
                                    </th>
                                    <th className='ft-weight-300 txt-center'>
                                        <span className="badge badge-secondary badge-style mob-display-act">Active</span>
                                    </th>
                                </tbody>
                            </Table>
                        </Card>
                        <Card div className='card-box-border myborder-list-style'>
                            <Table className='Table-head tbody-table' style={{ tableLayout: "fixed" }}>
                                <tbody>
                                    <th style={{ width: "20%" }} className='ft-weight-300'>
                                        00-09-2023 23:37:33
                                    </th>
                                    <th style={{ width: "19%" }} className='ft-weight-300'>
                                        TechOn Ventures
                                    </th>
                                    <th className='ft-weight-300'>
                                        +92345678901
                                    </th>
                                    <th className='ft-weight-300'>
                                        Instance 1, Instance 2
                                    </th>
                                    <th className='ft-weight-300 txt-center'>
                                        <span className="badge badge-secondary badge-style mob-display-act">Active</span>
                                    </th>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default MyBroadCast

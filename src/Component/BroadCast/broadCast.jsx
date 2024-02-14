import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Dropdown, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencil,
    faCheck,
    faPaperclip,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import './broadcast.css';
import * as XLSX from 'xlsx'; // Import the xlsx library

function BroadCast() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);

    const [excelData, setExcelData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const instanceOptions = ['Option 1', 'Option 2', 'Option 3'];

    const [isInputEnabled, setInputEnabled] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [templates, setTemplates] = useState([
        { textMessage: '' },
        { textMessage: '' },
        { textMessage: '' },
    ]);

    // Check if the current screen width is less than or equal to 820 pixels
    const isMobileView = window.innerWidth <= 820;

    // Use useEffect to update the templates with the default message when in mobile view
    useEffect(() => {
        if (isMobileView) {
            setTemplates([{ textMessage: '' }]);
        } else {
            // Reset templates to an empty array when not in mobile view
            setTemplates([{ textMessage: '' }, { textMessage: '' }, { textMessage: '' }]);
        }
    }, [isMobileView]);

    const attachmentInputs = useRef(Array(templates.length).fill(null));
    const [attachmentFiles, setAttachmentFiles] = useState(Array(templates.length).fill(null));

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

    const handleEnableInput = () => {
        setInputEnabled(true);
    };

    const handleSaveInput = () => {
        console.log('Input Value:', inputValue);
        setInputEnabled(false);
    };

    const toggleItemSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (
                file.type ===
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel'
            ) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];

                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                    // Assuming your Excel sheet has columns in this order: FirstName, LastName, Phone
                    const excelData = jsonData.slice(1); // Skip the header row

                    setExcelData(excelData);
                };

                reader.readAsBinaryString(file);
            } else {
                // Display an error message or alert for an invalid file type
                alert('Please select a valid Excel file.');
                e.target.value = null; // Reset the file input
            }
        }
    };

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

    console.log(excelData, 'asad');
    return (
        <>
            <div className={`${!isSidebarOpen ? 'trades-open' : ''}`}>
                <div style={{ marginTop: '6rem' }}></div>
                <Row className='row-bd-width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: '99%' }}>
                    <Col>
                        <Card className='card-box-border border-shadow-style'>
                            <div className='card-drop-style'>
                                <h2 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600' }}>
                                    BroadCast
                                </h2>
                            </div>
                            <Card className='card-box-border' style={{ padding: '15px 0' }}>
                                <form>
                                    <Row>
                                        <Col xs={12} md={4} lg={4}>
                                            <div className='instance-form-input'>
                                                <label> Name </label>
                                                <span>
                                                    <input
                                                        type='text'
                                                        placeholder='Name...'
                                                        className={`brdCast-input ${isInputEnabled ? '' : 'disabled'}`}
                                                        value={inputValue}
                                                        onChange={(e) => setInputValue(e.target.value)}
                                                        disabled={!isInputEnabled}
                                                    />
                                                    {!isInputEnabled && (
                                                        <FontAwesomeIcon
                                                            icon={faPencil}
                                                            className='broadCast-edit'
                                                            onClick={handleEnableInput}
                                                        />
                                                    )}
                                                    {isInputEnabled && (
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className='broadCast-edit'
                                                            onClick={handleSaveInput}
                                                            style={{ color: '#3ab19d' }}
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                        </Col>

                                        <Col xs={12} md={4} lg={4}>
                                            <div className='instance-form-input'>
                                                <label> Select Instance </label>
                                                <Dropdown>
                                                    <Dropdown.Toggle id='dropdown-basic' className='Drop-btnstyle'>
                                                        Select Instance
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu style={{ width: "100%" }}>
                                                        {instanceOptions.map((option, index) => (
                                                            <div key={index} className='form-check'>
                                                                <input
                                                                    type='checkbox'
                                                                    className='form-check-input'
                                                                    id={`checkbox-${index}`}
                                                                    checked={selectedItems.includes(option)}
                                                                    onChange={() => toggleItemSelection(option)}
                                                                />
                                                                <label className='form-check-label' htmlFor={`checkbox-${index}`}>
                                                                    {option}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4} lg={4}>
                                            <div className='instance-form-input'>
                                                <label> Upload Excel File </label>
                                                <span>
                                                    <input
                                                        type='file'
                                                        accept='.xls, .xlsx'
                                                        onChange={handleFileSelect}
                                                        className='brdCast-input'
                                                        style={{ padding: "8px 14px" }}
                                                    />
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </Card>
                        </Card>
                    </Col>
                </Row>
                <Row className='row-bd-width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: '99%' }}>
                    <Col>
                        <Card className='card-box-border border-shadow-style'>
                            <Col xs={12} md={12} lg={12}>
                                <div className='instance-form-input'>
                                    <h5> Message Templates</h5>
                                    <div className='message-templates-container'>
                                        {/* To add a new template */}
                                        {templates?.map((template, index) => (
                                            <div className='card-stylebdcast' key={index}>
                                                <form id={`form-file-upload-${index}`}>
                                                    <label id={`text-upload-${index}`} htmlFor={`input-file-upload-${index}`} style={{ width: '100%' }}>
                                                        <div className='text-area-main'>
                                                            <textarea
                                                                type='text'
                                                                placeholder='Enter your e...'
                                                                className='brdCast-input msg-temp-style'
                                                                value={template?.textMessage}
                                                                onChange={(e) => handleTemplateChange(e, index)}
                                                                style={{ border: 'none', backgroundColor: 'white', resize: 'none', height: "10vh" }}
                                                            />
                                                            <Button
                                                                className='Add-new-btn mob-btn'
                                                                onClick={() => attachmentInputs[index].click()} // Trigger file input click
                                                            >
                                                                <FontAwesomeIcon icon={faPaperclip} />
                                                            </Button>
                                                            <span>{template.attachmentFileName}</span> {/* Display file name */}
                                                            <input
                                                                type='file'
                                                                accept='.pdf, .doc, .docx, .mp3, .wav, .mp4, .jpg, .jpeg, .png, .svg'  // Specify the allowed file types here
                                                                onChange={(e) => handleAttachmentSelect(e, index)}
                                                                style={{ display: 'none' }} // Hide the input element
                                                                ref={(input) => (attachmentInputs[index] = input)}
                                                            />
                                                        </div>
                                                    </label>
                                                </form>
                                            </div>
                                        ))}
                                        {/* To add a new template end */}
                                        <div style={{ display: 'flex' }}>
                                            <Button className='Add-new-btn' onClick={handleAddTemplate}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <div className='msg-btns-style'>
                                <Button className='Add-new-btn Sd-Sch-font'>Send Now</Button>
                                <Button className='Add-new-btn Sd-Sch-font'>Schedule</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row className='row-bd-width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: '99%' }}>
                    <Col>
                        <Card className='card-box-border border-shadow-style' style={{ padding: '15px' }}>
                            <h6>
                                Contact List
                            </h6>
                            <Table style={{ tableLayout: "fixed" }}>
                                <thead className='bdCast-head-font'>
                                    <tr>
                                        <th style={{ width: '10%' }}>No</th>
                                        <th style={{ paddingLeft: '10px' }}>FirstName</th>
                                        <th style={{ paddingLeft: '10px' }}>LastName</th>
                                        <th style={{ display: 'flex', justifyContent: 'center' }}>Phone</th>
                                    </tr>
                                </thead>
                                <tbody className='bdCast-body-font'>
                                    {excelData?.map((row, index) => (
                                        <tr key={index} >
                                            <td >{index + 1}</td>
                                            <td>{row[0]}</td> {/* FirstName */}
                                            <td>{row[1]}</td> {/* LastName */}
                                            <td style={{ display: 'flex', justifyContent: 'center' }}>{row[6]}</td> {/* Phone */}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default BroadCast;

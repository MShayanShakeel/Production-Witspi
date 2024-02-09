import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Table, Form } from 'react-bootstrap';
import './creategp.css';

function CreateGroup() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [selectAll, setSelectAll] = useState(false);
    const handleSelectAllChange = () => {
        setSelectAll(!selectAll); // Toggle the "Select All" state
    };
    const handleCheckboxChange = () => {
        // For Individual checkbox, in Futher
    };

    // Function to handle changes in the input fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Update the corresponding state variable
        if (name === 'name') {
            setName(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    // Check if all required fields are filled if not (HIDE BTN)
    const isSaveButtonVisible = name === '' && description === '';

    return (
        <>
            <div className={`${!isSidebarOpen ? 'trades-open' : ''}`}>
            <div style={{ marginTop: '6rem' }}></div>
            <Row className='mob-row' style={{ marginBottom: '20px', marginLeft: '10px', width: "98.5%" }}>
                <Col>
                    <div className='card-drop-style'>
                        <h1 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600' }}>
                            Groups
                        </h1>
                    </div>
                    <Card className='card-box-border'>
                        <Col xs={12} md={12} lg={12} className='cr-display'>
                            <div className='instance-form-input'>
                                <label> Name </label>
                                <span>
                                    <input
                                        type='text'
                                        placeholder='Name...'
                                        className='input-instance'
                                        name='name'
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                </span>
                            </div>
                            <div className='instance-form-input'>
                                <label> Description </label>
                                <input
                                    type='text'
                                    placeholder='Description...'
                                    className='input-instance '
                                    name='description'
                                    value={description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </Col>
                        {!isSaveButtonVisible && (
                            <button
                                type='button'
                                className='myexecl-btn Save-CG-btn'
                            >
                                Save
                            </button>
                        )}
                    </Card>
                </Col>
            </Row>
            <Row className='mob-row' style={{ marginBottom: '20px', marginLeft: '10px', width: "98.5%" }}>
                <Col>
                    <Card className='card-box-border border-shadow-style CreateGpCard'>
                        <Table style={{ marginBottom: "0", tableLayout: "fixed" }}>
                            <thead>
                                <tr style={{ color: "#888" }} className='tr-create-gp'>
                                    <th className='th-checkbox'>
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAllChange}
                                            checked={selectAll}
                                        />
                                    </th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>Contacts</th>
                                    <th style={{ width: "30%" }}>Description</th>
                                </tr>
                            </thead>
                        </Table>
                    </Card>
                    <Card className='card-box-border border-shadow-style tbody-style-card'>
                        <Table style={{ marginBottom: "0", tableLayout: "fixed" }}>
                            <tbody>
                                <tr className='tr-font-style'>
                                    <td className='th-checkbox'>
                                        <input type="checkbox" onChange={handleCheckboxChange} checked={selectAll} />
                                    </td>
                                    <td>Huzaifa</td>
                                    <td>Rehman</td>
                                    <td>+920987654</td>
                                    <td style={{ width: "30%" }}>Lorem ipsum dolor sit amet consectetur.</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                    <Card className='card-box-border border-shadow-style tbody-style-card'>
                        <Table style={{ marginBottom: "0", tableLayout: "fixed" }}>
                            <tbody>
                                <tr className='tr-font-style'>
                                    <td className='th-checkbox'>
                                        <input type="checkbox" onChange={handleCheckboxChange} checked={selectAll} />
                                    </td>
                                    <td>Huzaifa</td>
                                    <td>Rehman</td>
                                    <td>+920987654</td>
                                    <td style={{ width: "30%" }}>Lorem ipsum dolor sit amet consectetur.</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                    <Card className='card-box-border border-shadow-style tbody-style-card'>
                        <Table style={{ marginBottom: "0", tableLayout: "fixed" }}>
                            <tbody>
                                <tr className='tr-font-style'>
                                    <td className='th-checkbox'>
                                        <input type="checkbox" onChange={handleCheckboxChange} checked={selectAll} />
                                    </td>
                                    <td>Huzaifa</td>
                                    <td>Rehman</td>
                                    <td>+920987654</td>
                                    <td style={{ width: "30%" }}>Lorem ipsum dolor sit amet consectetur.</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
            </div>
        </>
    )
}

export default CreateGroup

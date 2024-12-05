import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import SideBar from '../Sidebar';
const rowsPerPageOptions = [8, 10, 15];

const Services = () => {
    const [empdata, empdatachange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [searchText, setSearchText] = useState(""); // New state for search text

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const Removefunction = (item) => {
        const data = {
            _id: item._id
        };
        if (window.confirm('Do you want to inActive the Service?')) {
            axios.post(`http://localhost:5000/service/InactiveService`, data)
                .then((response) => {
                    console.log(response.data);
                    axios.post(`http://localhost:5000/service/getService`)
                        .then((response) => {
                            empdatachange(response.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching Services data:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error fetching Service data:', error);
                });
        }
    };

    const Activefunction = (item) => {
        const data = {
            _id: item._id
        };
        if (window.confirm('Do you want to Active the Service?')) {
            axios.post(`http://localhost:5000/service/ActiveService`, data)
                .then((response) => {
                    console.log(response.data);
                    axios.post(`http://localhost:5000/service/getService`)
                        .then((response) => {
                            empdatachange(response.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching Service data:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error fetching Service data:', error);
                });
        }
    };

    useEffect(() => {
        axios.post(`http://localhost:5000/service/getService`)
            .then((response) => {
                empdatachange(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    // Filter the data based on the search text
    const filteredEmpData = empdata.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.price.toString().includes(searchText)
        );
    });

    return (
        <div className="container" style={{ backgroundColor: "#000" }}>
            <div className="left-sidebar">
                <SideBar></SideBar>
            </div>
            <div className="right-content">
                <div className="centered-form" style={{ width: "900px", height: "100%" }}>
                    <div className="card" style={{ width: "1100px", height: "100%", marginLeft: "3px", marginRight: "0px" }}>
                        <div className="card-title" style={{ marginLeft: "300px" }}>
                            <h2>Services</h2>
                        </div>
                        <div className="card-body">
                            <div className="divbtn">
                                <div className="divbtn">
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Link to="/Admin/AddServices" className="btn btn-success">Add New (+)</Link>
                                        <div style={{ width: "400px", display: "flex", alignItems: "flex-end", backgroundColor: "#feffdf", border: "1px solid #ccc", borderRadius: "5px", padding: "5px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" ,marginTop:"10px",marginBottom:"10px"}}>
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                value={searchText}
                                                onChange={handleSearch}
                                                style={{ border: "none", outline: "none", width: "100%", padding: "5px",backgroundColor:"#feffdf",marginTop:"10px",marginBottom:"10px" }}
                                            />
                                            <i className="fa fa-search" style={{ marginLeft: "10px", color: "#888", cursor: "pointer", fontSize: "18px" }}></i>
                                        </div>
                                    </div>
                                </div> 


                            </div>
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>time</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmpData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item, index) => (
                                            <tr key={item._id}>
                                                <td>{page * rowsPerPage + index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>₹{item.price}</td>
                                                <td>
                                                    {item.time ? (
                                                        (parseInt(item.time, 10) >= 60 ? (
                                                            <>
                                                                {Math.floor(parseInt(item.time, 10) / 60)} hours{' '}
                                                                {parseInt(item.time, 10) % 60 !== 0 ? (
                                                                    `${parseInt(item.time, 10) % 60} minutes`
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </>
                                                        ) : (
                                                            `${item.time} minutes`
                                                        ))
                                                    ) : (
                                                        'N/A'
                                                    )}
                                                </td>
                                                <td>
                                                    <Link to={'/Admin/EditServices/' + item._id} className="btn btn-success" style={{ marginLeft: "5px" }}>Edit</Link>
                                                    <Link to={'/Admin/DetailServices/' + item._id} className="btn btn-primary" style={{ marginLeft: "5px" }}>Details</Link>
                                                    {!item.isActive && <a onClick={() => { Activefunction(item) }} className="btn btn-danger" style={{ marginLeft: "5px" }}>Active</a>}
                                                    {item.isActive && <a onClick={() => { Removefunction(item) }} className="btn btn-danger" style={{ marginLeft: "5px" }}>InActive</a>}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <div className="fluid-container" style={{ width: "600px", height: "10%" }}>
                                <TablePagination
                                    rowsPerPageOptions={rowsPerPageOptions}
                                    component="div"
                                    count={filteredEmpData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;

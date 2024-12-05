import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

const DetailServices = () => {
    const { id } = useParams();
    const [user, setuser] = useState({});
    const data = { serId: id };

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.post("http://localhost:5000/service/getServiceById", data);
                setuser(response.data);
            } catch (error) {
                console.error("Error fetching service data:", error);
            }
        };

        fetchService();
    }, [data]); // Added 'data' as a dependency

    const handleclick = () => {
        window.location.href = "/Admin/Services";
    };

    // Time Conversion Logic
    const timeInMinutes = user.time ? parseInt(user.time, 10) : 0;
    let timeToDisplay = "Loading...";
    if (timeInMinutes >= 60) {
        const hours = Math.floor(timeInMinutes / 60);
        const minutes = timeInMinutes % 60;
        timeToDisplay = minutes === 0 ? `${hours} hours` : `${hours} hours ${minutes} minutes`;
    } else if (timeInMinutes > 0) {
        timeToDisplay = `${timeInMinutes} minutes`;
    }

    return (
        <Card style={{ width: "400px", margin: "0 auto", marginTop: "50px" }}>
            {user.url ? <Card.Img variant="top" src={user.url} /> : <p>Loading image...</p>}
            <Card.Body>
                <Card.Title>{user.name || "Loading..."}</Card.Title>
                <p>Price: ₹{user.price || "Loading..."}</p>
                <p>Time: {timeToDisplay}</p>
                <p>Average Rating: {user.rating || "Loading..."}</p>
                <p>Description: {user.desc || "Loading..."}</p>
                <Button variant="primary" onClick={handleclick}>Go Back</Button>
            </Card.Body>
        </Card>
    );
};

export default DetailServices;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";

function DateTimeForm() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const { id } = useParams();
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const [timeSlots, setTimeSlots] = useState([
        '8:00:00',
        '9:00:00',
        '10:00:00',
        '11:00:00',
        '12:00:00',
        '13:00:00',
        '14:00:00',
        '15:00:00',
        '16:00:00',
        '17:00:00',
        '18:00:00',




        // Add more time slots as needed
    ]);


    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Selected Date:', selectedDate);
        console.log('Selected Time:', selectedTime);
    };
    useEffect(() => {

        const updateTime = () => {
            setCurrentTime(new Date());
        };

        // Set up a timer to update the time every second
        const intervalId = setInterval(updateTime, 1000);

        // Clean up the timer when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    const filteredTimeSlots = timeSlots.filter((slot) => {
        const [hour, minute] = slot.split(':');
        const slotTime = new Date();
        slotTime.setHours(parseInt(hour));
        slotTime.setMinutes(parseInt(minute));

        return slotTime > currentTime;
    });

    return (
        <div>
            <h1>{currentTime.toLocaleTimeString()}</h1>
            <h2>Date and Time Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="datePicker" className="form-label">
                        Select Date:
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="datePicker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <div>
                        <h2>Select a Time Slot</h2>
                        <div className="mb-3">
                            <label htmlFor="timeSlotSelect" className="form-label">
                                Time Slot:
                            </label>
                            <select
                                id="timeSlotSelect"
                                className="form-select"
                                value={selectedTime}
                                onChange={handleTimeChange}
                            >
                                <option value="">Select a time slot</option>
                                {filteredTimeSlots.map((slot) => (
                                    <option key={slot} value={slot}> {slot}</option>
                                ))}

                            </select>


                        </div>

                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default DateTimeForm;

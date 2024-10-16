import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8080';

const BookingPopup = ({ open, onClose, center, sport, court, timeSlot, date, onBookingCreated }) => {
    const [customerName, setCustomerName] = useState('');

    const handleBooking = async () => {
        try {
            const bookingData = {
                center_id: center,
                court_id: court,
                date: date,
                time_slot: timeSlot,
                customer_name: customerName,
            };

            const response = await axios.post(`${BASE_URL}/booking`, bookingData);
            console.log(response.data);
            onBookingCreated();
            onClose();
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Booking</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Center ID"
                    type="text"
                    fullWidth
                    value={center}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    margin="dense"
                    label="Sport ID"
                    type="text"
                    fullWidth
                    value={sport}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    margin="dense"
                    label="Court ID"
                    type="text"
                    fullWidth
                    value={court}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    margin="dense"
                    label="Time Slot"
                    type="text"
                    fullWidth
                    value={timeSlot}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    margin="dense"
                    label="Date"
                    type="text"
                    fullWidth
                    value={date}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Customer Name"
                    type="text"
                    fullWidth
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleBooking} color="primary">
                    Book
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookingPopup;

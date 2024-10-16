import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Box,
    Paper,
    CircularProgress,
    Typography,
} from '@mui/material';
import BookingPopup from './bookingPopup';

const BASE_URL = 'http://127.0.0.1:8080';

const BookingTable = ({ selectedCenter, selectedSport, selectedDate }) => {
    const [courts, setCourts] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    useEffect(() => {
        const fetchCourts = async () => {
            try {
                const courtResponse = await axios.get(`${BASE_URL}/court/${selectedSport}`);
                setCourts(courtResponse.data);
            } catch (error) {
                console.error(`Error fetching courts for sport ${selectedSport}:`, error);
            }
        };

        const fetchBookings = async () => {
            try {
                const bookingResponse = await axios.get(`${BASE_URL}/booking/${selectedCenter}/${selectedSport}?date=${selectedDate}`);
                if (bookingResponse.data.message === "Empty") {
                    setBookings([]);
                } else {
                    setBookings(bookingResponse.data);
                }
            } catch (error) {
                console.error(`Error fetching bookings for center ${selectedCenter}, sport ${selectedSport}, and date ${selectedDate}:`, error);
                setBookings([]);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await fetchCourts();
            await fetchBookings();
            setLoading(false);
        };

        if (selectedCenter && selectedSport && selectedDate) {
            fetchData();
        }
    }, [selectedCenter, selectedSport, selectedDate]);

    const getBookingForCourtAndTime = (courtId, timeSlot) => {
        return bookings.find(booking => booking.court_id._id === courtId && booking.time_slot === timeSlot);
    };

    const handleOpenPopup = (courtId, timeSlot) => {
        setSelectedCourt(courtId);
        setSelectedTimeSlot(timeSlot);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleBookingCreated = () => {
        const fetchBookings = async () => {
            try {
                const bookingResponse = await axios.get(`${BASE_URL}/booking/${selectedCenter}/${selectedSport}?date=${selectedDate}`);
                if (bookingResponse.data.message === "Empty") {
                    setBookings([]);
                } else {
                    setBookings(bookingResponse.data);
                }
            } catch (error) {
                console.error(`Error fetching bookings for center ${selectedCenter}, sport ${selectedSport}, and date ${selectedDate}:`, error);
            }
        };

        fetchBookings();
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Bookings for {selectedDate}
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '100px' }}>Time Slot</TableCell>
                            {courts.map((court) => (
                                <TableCell key={court._id} sx={{ width: '150px' }}>{court.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timeSlots.map((timeSlot) => (
                            <TableRow key={timeSlot}>
                                <TableCell>{timeSlot}</TableCell>
                                {courts.map((court) => {
                                    const booking = getBookingForCourtAndTime(court._id, timeSlot);
                                    return (
                                        <TableCell
                                            key={court._id}
                                            sx={{
                                                cursor: booking ? 'default' : 'pointer',
                                                backgroundColor: booking ? 'lightblue' : 'white',
                                                borderRadius: booking ? '8px' : '0',
                                                textAlign: 'center',
                                                '&:hover': { backgroundColor: booking ? 'lightblue' : '#f0f0f0' },
                                            }}
                                            onClick={() => {
                                                if (!booking) {
                                                    handleOpenPopup(court._id, timeSlot);
                                                }
                                            }}
                                        >
                                            {booking ? booking.customer_name : ''}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {bookings.length === 0 && (
                    <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
                        No bookings available for the selected date and center.
                    </Typography>
                )}
            </Paper>

            <BookingPopup
                open={popupOpen}
                onClose={handleClosePopup}
                center={selectedCenter}
                sport={selectedSport}
                court={selectedCourt}
                timeSlot={selectedTimeSlot}
                date={selectedDate}
                onBookingCreated={handleBookingCreated}
            />
        </Box>
    );
};

export default BookingTable;

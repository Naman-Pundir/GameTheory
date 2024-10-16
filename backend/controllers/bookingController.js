const Booking = require('../models/booking');
const Court = require('../models/court');

exports.createBooking = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const newBooking = new Booking(data);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBookingsByCenter = async (req, res) => {
    try {
        const bookings = await Booking.find({ center_id: req.params.center_id }).populate('court_id');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get bookings by center ID and date
exports.getBookingsByCenterDateAndSport = async (req, res) => {
    try {
        const { center_id, sports_id } = req.params;
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: 'Empty' });
        }

        // Parse the date and create a range for the whole day
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999); // Set the end of the day to 23:59:59.999

        // Fetch all courts for the specified sport in the given center
        const courts = await Court.find({sports_id: sports_id });

        if (!courts || courts.length === 0) {
            return res.status(404).json({ message: 'Empty' });
        }

        // Extract court IDs for filtering bookings
        const courtIds = courts.map(court => court._id);

        // Fetch bookings for the specified center, date range, and courts
        const bookings = await Booking.find({
            center_id: center_id,
            date: { $gte: startDate, $lte: endDate }, // Match the date within the whole day
            court_id: { $in: courtIds }
        }).populate('court_id');

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'Empty' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
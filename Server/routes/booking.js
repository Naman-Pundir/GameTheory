const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/:center_id', bookingController.getBookingsByCenter);
router.get('/:center_id/:sports_id', bookingController.getBookingsByCenterDateAndSport);


module.exports = router;
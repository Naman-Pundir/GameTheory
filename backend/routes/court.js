const express = require('express');
const router = express.Router();
const courtController = require('../controllers/courtController')

router.get('/:sport_id',courtController.getCourtsBySport);

module.exports = router;
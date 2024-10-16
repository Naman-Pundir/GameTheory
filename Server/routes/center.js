const express = require('express');
const router = express.Router();
const centerController = require('../controllers/centerController');

router.get('/:center_id/sports',centerController.getSportsByCenter);
router.get('/', centerController.getAllCenters);

module.exports = router;
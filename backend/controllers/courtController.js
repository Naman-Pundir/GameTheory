const Court = require('../models/court');

exports.getCourtsBySport = async (req, res) => {
    try {
        const courts = await Court.find({ sports_id: req.params.sport_id });
        res.json(courts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
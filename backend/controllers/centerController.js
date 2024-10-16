const Center = require('../models/center');
const Sport = require('../models/sports');

exports.getSportsByCenter = async (req, res) => {
    try {
        const { center_id } = req.params;
        const center = await Center.findById(center_id);
        if (!center) {
            return res.status(404).json({ message: 'Center not found' });
        }
        const sports = await Sport.find({ _id: { $in: center.sports_ids } });
        const sportsArray = sports.map(sport => ({
            sport_id: sport._id,
            name: sport.name,
        }));
        res.json({
            center: center.name,
            sports: sportsArray
        });
    } catch (error) {
        console.error('Error fetching sports:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.getAllCenters = async(req,res) => {
    try{
        const center = await Center.find({});
        res.json(center);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

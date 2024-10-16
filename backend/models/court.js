const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courtSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    sports_id: {
        type: Schema.Types.ObjectId,
        ref: 'Sports',
        required: true,
    },
});

const Court = mongoose.model('Court',courtSchema);
module.exports = Court;
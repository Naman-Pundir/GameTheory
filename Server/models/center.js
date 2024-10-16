const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const centerSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    sports_ids:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Sport',
        },
    ],
});

const center = mongoose.model('center',centerSchema);
module.exports = center;
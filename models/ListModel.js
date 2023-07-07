const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    todo: [{
        _id: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }]
}, { timestamp: true });

module.exports = mongoose.model("List", ListSchema);
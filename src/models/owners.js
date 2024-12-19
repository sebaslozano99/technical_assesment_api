const { Schema, model } = require("mongoose");

const ownersSchema = new Schema({
    owner_id: Number,
    first_name: String,
    last_name: String,
    cars: Array,
    pets: Array
}, {collection: "owners"});


module.exports = model("Owner", ownersSchema);
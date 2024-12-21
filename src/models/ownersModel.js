const { Schema, model } = require("mongoose");

const ownersSchema = new Schema({
    owner_id: Number,
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    cars: Array,
    pets: Array
    }, {
    statics: {
        isOwnerInDB(ownerId) {
            return this.exists({owner_id: ownerId});
            }
        }
    }
);



const Owner = model("Owner", ownersSchema);

module.exports = Owner;
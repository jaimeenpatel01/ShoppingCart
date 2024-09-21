const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    products: {
        type: Array,
        default: [],
    },
    picture: String,
    gstin: String,
});

const Owner = mongoose.model("owner", ownerSchema);

module.exports = Owner;


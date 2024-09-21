const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://jaimeen:1234@shoppingcartcluster.8baxg.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingCartCluster"
    )
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

module.exports = mongoose.connection;

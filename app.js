const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const db= require('./config/connection.config');
const ownerRoutes = require("./routes/owner.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownerRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);


app.listen(3000, () => console.log("server is running on port 3000"));


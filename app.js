const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const expressSession = require("express-session");
const flash = require("connect-flash");

const db = require('./config/connection.config');

const indexRouter=require("./routes/index.js")
const ownerRoutes = require("./routes/owner.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

require('dotenv').config();

app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownerRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);


app.listen(3000, () => console.log("server is running on port 3000"));




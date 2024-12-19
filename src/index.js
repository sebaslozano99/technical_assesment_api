const express = require("express");
const mongoose = require("mongoose");
const { ownersRouter } = require("./Routes/ownersRoute.js");


// Connection to MongoDB
mongoose.connect("mongodb://localhost:27017/ownership_db")
    .then(() => console.log("Connected to Mongoose!"))
    // .then((error) => console.error("Error connecting to MongoDB: ", error)); 


const app = express();


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// ROUTES
app.use("/api", ownersRouter);


const PORT = 5000;


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})
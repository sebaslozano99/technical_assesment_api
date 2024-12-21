const express = require("express");
const mongoose = require("mongoose");
const { ownersRouter } = require("./Routes/ownersRoute.js");


const app = express();


mongoose.connect("mongodb://localhost:27017/ownership_db")
    .then(() => console.log("Connected to Mongoose!"))
    .catch(error => console.log(error));



// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// ROUTES
app.use("/api", ownersRouter);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})
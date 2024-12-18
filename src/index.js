const express = require("express");
const { ownersRouter } = require("./Routes/ownersRoute.js");

const app = express();


// SETTINGS 


// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// ROUTES
app.use("/api", ownersRouter);


const PORT = 5000;


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})
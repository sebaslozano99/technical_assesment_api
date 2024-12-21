const { Router } = require("express");
const { getOwners } = require("../controllers/ownersController.js");


const ownersRouter = Router();


ownersRouter.get("/owners/:ownerID", getOwners);



module.exports = { ownersRouter }
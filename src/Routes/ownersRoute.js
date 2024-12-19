const { Router } = require("express");
const { getOwners } = require("../controllers/ownersController.js");


const ownersRouter = Router();


ownersRouter.get("/owners/:owner_id", getOwners);



module.exports = { ownersRouter }
const { Router } = require("express");
const { getOwners } = require("../controllers/ownersController.js");


const ownersRouter = Router();


ownersRouter.get("/owners/:id_owner", getOwners);



module.exports = { ownersRouter }
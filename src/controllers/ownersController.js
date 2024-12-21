const Owner = require("../models/ownersModel.js");
const { getOwnerFromPostgres } = require("../services/ownersPostgres.js");



const getOwners = async (req, res) => {
    
    const { ownerID } = req.params;

    try {

        const postgresOwnerData = await getOwnerFromPostgres(ownerID);

        // if no user is found in the POSTGRES DB with the passed id, return an error message
        if(!Object.keys(postgresOwnerData).length) return res.status(404).json({message: `Owner with ID ${ownerID} was not found in postgres!`});

        

        const isOwnerInDB = await Owner.isOwnerInDB(ownerID); 

        if(isOwnerInDB) return res.status(200).json({message: `Owner with id ${ownerID} was migrated already!`});

        const migratedOwner = await Owner.create(postgresOwnerData);

        res.status(200).json({message: "Data migrated successfully!", status: "success", data: migratedOwner});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: error || "Internal Server Error!", status: "Failed"});
    }
}




module.exports = { getOwners }

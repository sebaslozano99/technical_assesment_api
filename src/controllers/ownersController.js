const Owner = require("../models/ownersModel.js");
const { getOwnerFromPostgres } = require("../services/ownersPostgres.js");


const getOwners = async (req, res) => {
    
    const { id_owner } = req.params;

    if(!id_owner) return res.status(400).json({message: `Invalid owner id provided!`});

    try {

        const postgresOwnerData = await getOwnerFromPostgres(id_owner);

        // if no user is found in the POSTGRES DB with the passed id, return an error message
        if(!Object.keys(postgresOwnerData).length) return res.status(404).json({message: `Owner with ID ${id_owner} was not found!`});

        const isOwnerInDB = await Owner.isOwnerInDB(id_owner); 

        if(isOwnerInDB) return res.status(200).json({message: `Owner with id ${id_owner} was migrated already!`});

        const migratedOwner = await Owner.create(postgresOwnerData);

        res.status(200).json(migratedOwner);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: error || "Internal Server Error!"});
    }
}




module.exports = { getOwners }

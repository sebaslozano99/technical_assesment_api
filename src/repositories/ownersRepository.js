const Owner = require("../models/ownersModel.js");


class OwnerRepository {
    // create new user
    async createUser(newOwnerData){
        try{
            const user = new Owner(newOwnerData);
            return await user.save();
        }
        catch(error){
            throw new Error(`Error creating user : ${error.message}`)
        }
    }


    // check owner does not exist yet
    async isOwnerInDB(ownerID){
        try{
            const isOwnerInDB = await Owner.exists({owner_id: ownerID});
            return isOwnerInDB;
        }
        catch(error){
            throw new Error(`Error `)
        }
    }
}


module.exports = new OwnerRepository();
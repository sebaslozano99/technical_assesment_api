const database = require("../config/database.js");
const Owner = require("../models/owners.js");


const getOwners = async (req, res) => {
    
    const { id_owner } = req.params;

    try {

        await database.connect();

        const {rows} = await database.query(`
            SELECT 
                person.id AS owner_id,
                first_name,
                last_name,
                JSON_AGG(
                    JSON_OBJECT(
                        ARRAY['car_id', 'car'],
                        ARRAY[cars.id::text, cars.car]
                    )
                ) AS cars,
                JSON_AGG(
                    JSON_OBJECT(
                        ARRAY['pet_id', 'pet_name', 'pet_breed'],
                        ARRAY[pets.id::text, pet_name, breed]
                    )
                ) AS pets
            FROM person
            LEFT JOIN cars ON cars.person_id = person.id
            LEFT JOIN pets ON pets.person_id = person.id
            WHERE person.id = $1
            GROUP BY person.id 
        `, [id_owner]);


        // if no user in the POSTGRES DB with the passed id, return an error message
        if(!rows.length) return res.status(404).json({message: `Owner with ID ${id_owner} was not found!`});

        const isOwnerInDB = await Owner.exists({ owner_id: id_owner });

        console.log("Exists? ", isOwnerInDB);

        if(isOwnerInDB) return res.status(200).json({message: `Owner with id ${id_owner} is already in the database!`});

        const newOwner = new Owner(rows[0]);

        await newOwner.save();

        res.status(200).json(rows);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: error || "Internal Server Error!"});
    }
}




module.exports = { getOwners }

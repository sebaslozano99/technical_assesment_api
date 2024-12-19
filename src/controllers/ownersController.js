const database = require("../config/database.js");



const getOwners = async (req, res) => {
    
    const { owner_id } = req.params;

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
        `, [owner_id]);

        await database.end();
        res.status(200).json(rows);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: error || "Internal Server Error!"});
    }
    finally {
        database.end();
    }
}




module.exports = { getOwners }

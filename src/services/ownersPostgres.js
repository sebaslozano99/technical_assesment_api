const database = require("../config/database.js");



async function getOwnerFromPostgres(ownerId){
    try{
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
        `, [ownerId]);
    
        if(rows.length) return rows[0];
        else return {};
    }
    catch(error){
        throw new Error(error);
    }
}

module.exports = { getOwnerFromPostgres };
const database = require("../config/database.js");


// Since each person could have more than one pet and vehicule, when joining the 3 tables together it was causing duplication of the data. This, It was used only one JOIN and a subquery to get the pets data 
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

                (
                    SELECT 
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                ARRAY['pet_id', 'pet_name', 'pet_breed'],
                                ARRAY[pets.id::text, pets.pet_name, pets.breed]
                            )
                        ) AS petsArray
                    FROM pets
                    WHERE pets.person_id = $1
                ) AS pets

            FROM person
            LEFT JOIN cars ON cars.person_id = person.id
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
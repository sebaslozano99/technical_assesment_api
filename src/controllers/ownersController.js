const database = require("../config/database.js");



const getOwners = async (req, res) => {
    
    try {
        await database.connect();
        const {rows} = await database.query(`
            SELECT 
                person.id AS owner_id,
                first_name,
                last_name,
                ARRAY_AGG(
                    json_object('{car_id, cars.id}', '{car, cars.car}')
                ) AS cars
            FROM person
            LEFT JOIN cars ON cars.person_id = person.id
            GROUP BY person.id 
        `);
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: error || "Internal Server Error!"});
    }
}




module.exports = { getOwners }
const {pool} = require('../db')

async function getAllSportMan() {
    try {
        conn = await pool.getConnection();
        data = await conn.query(
            "SELECT SportsMan.ID, SportsMan.sportManName, SportsMan.age, SportsMan.height, SportsMan.weight_, Sports.name_ from SportsMan INNER JOIN Sports ON SportsMan.type_ = Sports.ID;")

        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
    }
}

async function addSportMan(sportManName, age, height, weight, type) {
    try {
        conn = await pool.getConnection();
        data = await conn.query("INSERT INTO SportsMan (sportManName, age, height, weight_, type_) VALUES (?,?,?,?,?);",
            [
                sportManName,
                age,
                height,
                weight,
                type
            ]
        )
        conn.destroy()
    } catch (err) {
         
    }
}

async function deleteSportMan(id) {
    console.log('ID', id)
    try {
        conn = await pool.getConnection();
        console.log(id)
        await conn.query("DELETE FROM SportsMan WHERE ID = ?;", [id])

        conn.destroy()
    } catch (err) {
         
    }
}

module.exports = {getAllSportMan, addSportMan, deleteSportMan}
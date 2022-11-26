const {pool} = require('../db')

async function getAllCoaches() {
    try {
        conn = await pool.getConnection();
        data = await conn.query("SELECT * from Coach;")

        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
        throw err
    }
}

async function deleteCoach(id) {
    try {
        conn = await pool.getConnection();
        console.log(id)
        await conn.query("DELETE FROM Coach WHERE coachID = ?;", [id])

        conn.destroy()
    } catch (err) {
        throw err
    }
}

async function addCoach(type, name) {
    try {
        conn = await pool.getConnection();
        data = await conn.query("INSERT INTO Coach (sportType, coachName) VALUES (?,?);",
            [
                type,
                name,
            ]
        )
        conn.destroy()
    } catch (err) {
        throw err
    }
}

function updateCoach(type, name) {
    for(var i = 0; i < Coaches.length; i++) {
        if(Coaches[i].id == id) {
            
        }
    }

    Coaches.push({
        id: Coaches.length + 1,
        type: type,
        name: name
    })
}

module.exports = {getAllCoaches, addCoach, deleteCoach}
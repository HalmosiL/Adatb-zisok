const {pool} = require('../db')

async function getAllSports() {
    try {
        conn = await pool.getConnection();
        data = await conn.query("SELECT ID as id, type_, name_, difficulty, coachName as coach FROM Sports INNER JOIN Coach ON Sports.coachID = Coach.coachID;")

        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
        throw err
    }
}

async function deleteByID(id) {
    try {
        conn = await pool.getConnection();
        console.log(id)
        await conn.query("DELETE FROM Sports WHERE ID = ?;", [id])

        conn.destroy()
    } catch (err) {
        throw err
    }
}

function updateElement(id, type, name, difficulty, coach) {
    for(var i=0; i<Sports.length; i++) {
        if(Sports[i].id == id){
            Sports[i] = {
                id: id,
                type: type,
                name: name,
                difficulty: difficulty,
                coach: coach
            }
        }
    }
}

async function addElement(type, name, difficulty, coach_id) {
    try {
        conn = await pool.getConnection();
        data = await conn.query("INSERT INTO Sports (type_, name_, difficulty, coachID) VALUES (?,?,?,?);",
            [
                type,
                name,
                difficulty,
                coach_id
            ]
        )
        conn.destroy()
    } catch (err) {
        throw err
    }
}

async function getSportsByType(type) {
    try {
        conn = await pool.getConnection();
        data = await conn.query(
            "SELECT ID as id, type_, name_, difficulty, coachName as coach FROM Sports INNER JOIN Coach ON Sports.coachID = Coach.coachID And Sports.type_ = ?;",
            [type]
        )

        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
        throw err
    }
}

async function getSportsByName(name){
    try {
        conn = await pool.getConnection();
        data = await conn.query(
            "SELECT ID as id, type_, name_, difficulty, coachName as coach FROM Sports INNER JOIN Coach ON Sports.coachID = Coach.coachID And Sports.name_ like ?;",
            ["%" + name + "%"]
        )

        console.log(data)

        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
        throw err
    }
}

async function getSportsByDificulty(difficulty) {
    try {
        conn = await pool.getConnection();
        data = await conn.query(
            "SELECT ID as id, type_, name_, difficulty, coachName as coach FROM Sports INNER JOIN Coach ON Sports.coachID = Coach.coachID And Sports.difficulty = ?;",
            [difficulty]
        )

        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
        throw err
    }
}

async function getSportsByCoach(coachID) {
    try {
        conn = await pool.getConnection();
        data = await conn.query(
            "SELECT ID as id, type_, name_, difficulty, coachName as coach FROM Sports INNER JOIN Coach ON Sports.coachID = Coach.coachID And Sports.coachID = ?;",
            [coachID]
        )

        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
        throw err
    }
}


module.exports = {getAllSports, deleteByID, addElement, getSportsByDificulty, getSportsByName, getSportsByType, getSportsByCoach, updateElement}
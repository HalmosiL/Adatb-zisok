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
         
    }
}

async function getSportsCounts() {
    try {
        conn = await pool.getConnection();
        data = await conn.query("select count(SportsMan.ID) as count, Sports.name_ from Sports inner join SportsMan on Sports.ID=SportsMan.type_ group by Sports.name_;")

        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
         
    }
}

async function deleteByID(id) {
    try {
        conn = await pool.getConnection();
        console.log(id)
        await conn.query("DELETE FROM Sports WHERE ID = ?;", [id])

        conn.destroy()
    } catch (err) {
         
    }
}

async function updateElement(id, type, name, difficulty, coach_id) {
    try {
        conn = await pool.getConnection();
        data = await conn.query("UPDATE Sports SET Sports.type_ = ?, Sports.name_ = ?, Sports.difficulty = ?, Sports.coachID = ?  WHERE Sports.ID = ?;",
            [
                type,
                name,
                difficulty,
                coach_id,
                id
            ]   
        )
        conn.destroy()
    } catch (err) {
         
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
         
    }
}


module.exports = {getAllSports, deleteByID, addElement, getSportsByDificulty, getSportsByName, getSportsByType, getSportsByCoach, updateElement, getSportsCounts}
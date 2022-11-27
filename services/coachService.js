const {pool} = require('../db')

async function averagePoints() {
    try {
        conn = await pool.getConnection();
        data = await conn.query("select coachName, AVG(points_) from Coach inner join Comment on Coach.coachID = Comment.coachID group by coachName;")

        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
    }
}

async function getAllCoachV() {
    try {
        conn = await pool.getConnection();
        data = await conn.query("select * from Coach;")

        conn.destroy()

        console.log(data)

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
    }
}

async function getAllCoaches() {
    try {
        conn = await pool.getConnection();
        data = await conn.query("select sportType, coachName, AVG(points_), MAX(points_), MIN(points_)  from Coach inner join Comment on Coach.coachID = Comment.coachID group by coachName;")

        conn.destroy()

        console.log(data)

        if(data === undefined) {
            return []
        } else {
            data_ = []

            for(var i = 0; i < data.length; i++) {
                data_.push({
                    sportType: data[i].sportType,
                    coachName: data[i].coachName,
                    AVG: Object.values(data[0])[2],
                    MAX: Object.values(data[0])[3],
                    MIN: Object.values(data[0])[4]
                })
            }
        }

        return data_
    } catch (err) {
    }
}

async function deleteCoach(id) {
    try {
        conn = await pool.getConnection();
        console.log(id)
        await conn.query("DELETE FROM Coach WHERE coachID = ?;", [id])

        conn.destroy()
    } catch (err) {
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
    }
}

async function updateCoach(type, name, id) {
    try {
        conn = await pool.getConnection();
        data = await conn.query("UPDATE Coach SET Coach.sportType = ?, Coach.coachName = ?  WHERE Coach.coachID = ?;",
            [
                type,
                name,
                id
            ]
        )
        conn.destroy()
    } catch (err) {
    }
}

module.exports = {getAllCoaches, addCoach, deleteCoach, updateCoach, averagePoints, getAllCoachV}
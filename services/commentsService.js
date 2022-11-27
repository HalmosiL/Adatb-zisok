const {pool} = require('../db')

async function getAllComments() {
    try {
        conn = await pool.getConnection()
        data = await conn.query("SELECT commentID, text_, points_, coachName  from Comment INNER JOIN  Coach ON Comment.coachID = Coach.coachID;")
        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {

    }
}

async function addComment(text, points, coachID) {    
    try {
        conn = await pool.getConnection();
        data = await conn.query("INSERT INTO Comment (text_, points_, coachID) VALUES (?, ?, ?);",
            [
                text,
                points,
                coachID
            ]
        )
        conn.destroy()
    } catch (err) {

    }
}

async function deleteComments(id) {
    try {
        conn = await pool.getConnection();
        await conn.query("DELETE FROM Comment WHERE commentID = ?;", [id])

        conn.destroy()
    } catch (err) {

    }
}

async function goodComments() {
    try {
        conn = await pool.getConnection();
        data = await conn.query("select coachName, text_ from Coach inner join Comment on Coach.coachID=Comment.coachID where Comment.points_ > (select AVG(points_) from Comment);")
        
        conn.destroy()

        return data

    } catch (err) {

    }
}

async function avgPoints() {
    try {
        conn = await pool.getConnection();
        data = await conn.query("select AVG(points_) from Comment;")
        conn.destroy()

        return Object.values(data[0])[0]

    } catch (err) {

    }
}

module.exports = {deleteComments, addComment, getAllComments, avgPoints, goodComments}
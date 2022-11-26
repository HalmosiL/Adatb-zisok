const {pool} = require('../db')

async function getAllSportMan() {
    try {
        conn = await pool.getConnection();
        data = await conn.query("SELECT * from SportsMan;")

        conn.destroy()

        if(data === undefined) {
            return []
        }

        return data
    } catch (err) {
        throw err
    }
}

function addSportMan(name, age, height, weight, sportBranch) {
    sportMan.push({
        id: sportMan.length + 1,
        name: name,
        age: age,
        height: height,
        weight: weight,
        sportBranch: sportBranch
    })
}

function deleteSportMan(id) {
    for(var i = 0; i < sportMan.length; i++) {
        if(sportMan[i].id == id) {
            sportMan.splice(i, 1)
        }
    }
}

module.exports = {getAllSportMan, addSportMan, deleteSportMan}
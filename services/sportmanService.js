sportMan = [
    {
        id: 1,
        name: "a",
        age: "b",
        height: "c",
        height: "d",
        sportBranch: "e"
    }
]

function getAllSportMan() {
    return sportMan
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
Sports = [
    {
        id:1,
        type: "1labda",
        name:"labda",
        difficulty:"labda",
        coach:"labda"
    },
    {
        id:2,
        type: "2labda",
        name:"labda",
        difficulty:"labda",
        coach:"labda"
    },
    {
        id:3,
        type: "3labda",
        name:"labda",
        difficulty:"labda",
        coach:"labda"
    }
]

function getAllSports() {
    return Sports
}

function deleteByID(id) {
    for(var i=0; i<Sports.length; i++) {
        if(Sports[i].id == id) Sports.splice(i, 1)
    }
}

function addElement(type, name, difficulty, coach) {
    Sports.push({
        id: Sports.length + 1,
        type: type,
        name: name,
        difficulty: difficulty,
        coach: coach
    })
}

module.exports = {getAllSports, deleteByID, addElement}
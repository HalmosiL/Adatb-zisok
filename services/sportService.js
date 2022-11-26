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

function addElement(type, name, difficulty, coach) {
    Sports.push({
        id: Sports.length + 1,
        type: type,
        name: name,
        difficulty: difficulty,
        coach: coach
    })
}

function getSportsByType(type) {
    SportsL = []

    for(var i = 0; i < Sports.length; i++) {
        if(Sports[i].type == type) {
            SportsL.push(Sports[i])
        }
    }

    return SportsL
}

function getSportsByName(name){
    SportsL = []

    for(var i = 0; i < Sports.length; i++) {
        if(Sports[i].name == name) {
            SportsL.push(Sports[i])
        }
    }

    return SportsL
}

function getSportsByDificulty(difficulty) {
    SportsL = []

    for(var i = 0; i < Sports.length; i++) {
        if(Sports[i].difficulty == difficulty) {
            SportsL.push(Sports[i])
        }
    }

    return SportsL
}

function getSportsByCoach(coach) {
    console.log(coach)
    SportsL = []

    for(var i = 0; i < Sports.length; i++) {
        if(Sports[i].coach == coach) {
            SportsL.push(Sports[i])
        }
    }

    return SportsL
}


module.exports = {getAllSports, deleteByID, addElement, getSportsByDificulty, getSportsByName, getSportsByType, getSportsByCoach, updateElement}
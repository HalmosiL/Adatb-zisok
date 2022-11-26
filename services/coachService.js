Coaches = [
    {
        id: 1,
        type: 'Labda',
        name: "Bob"
    }
]

function getAllCoaches() {
    return Coaches
}

function deleteByID(id) {
    for(var i=0; i<Coaches.length; i++) {
        if(Coaches[i].id == id) Coaches.splice(i, 1)
    }
}

function addCoach(type, name) {
    Coaches.push({
        id: Coaches.length + 1,
        type: type,
        name: name
    })
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

function deleteCoach(id) {
    for(var i=0; i<Coaches.length; i++) {
        if(Coaches[i].id == id) Coaches.splice(i, 1)
    }
}

module.exports = {getAllCoaches, deleteByID, addCoach, deleteCoach}
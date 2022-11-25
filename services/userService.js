Users = [
    {
        email: 'halmosilevente@gmail.com',
        password: 'asd'
    }
]

function createUser(email, password) {
    console.log("User created:" , email, " " ,password)
    Users.push({
        email: email,
        password: password
    })
}

function login(email, password) {
    console.log("User login:" , email, " " ,password)

    for(var i=0; i<Users.length; i++) {
        if(Users[i].email == email && Users[i].password == password) {
            return true
        }
    }

    return false
}

function getUser(email) {
    for(var i=0; i<Users.length; i++) {
        if(Users[i].email == email) {
            return Users[i]
        }
    }

    return null
}

module.exports = {createUser, login, getUser}
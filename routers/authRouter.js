const express = require('express')
const {getAllSports} = require('../services/sportService.js')
const {checkSignIn} = require('../auth.js')
const {createUser, login, getUser} = require('../services/userService.js')

const router = express.Router()

router.get('/login', (req, res) => {
    if(req.session.user){
        res.redirect('/')
    } else {
        res.render('login')
    }
});
 
router.post('/login', (req, res) => {
    if(!req.body.email || !req.body.password){
        res.render('login');
    } else {
        if(login(req.body.email, req.body.password)){
            req.session.user = getUser(req.body.email);
            res.redirect('/')
        }  else {
            res.render('login')
        }
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(function(){
        console.log("user logged out.")
    });
    res.redirect('/login')
})

router.get('/', checkSignIn, (req, res) => {
    res.render('index', {sports: getAllSports()})
})

router.post('/type', checkSignIn, (req, res) => {
    res.render('index', {sports: getSportsBy(req.body.type)})
})

router.post('/name', checkSignIn, (req, res) => {
    res.render('index', {sports: getSportsByName(req.body.dificulty)})
})

router.post('/dificulty', checkSignIn, (req, res) => {
    res.render('index', {sports: getSportsByDificulty(req.body.dificulty)})
})

router.get('/signup', (req, res) => {
    if(req.session.user){
        res.redirect('/')
    } else {
        res.render('signup')
    }
})
 
router.post('/signup', (req, res) => {
 
    if(!req.body.email || !req.body.password){
       res.status("400");
       res.send("Invalid details!")
    } else if(req.body.password != req.body.passwordAgain){
        res.status("400");
        res.send("Two password has to be the same!")
    } else { 
       var newUser = {id:1, email: req.body.email, password: req.body.password}

        if(getUser(req.body.email) === null){
            createUser(newUser.email, newUser.password)

            req.session.user = newUser;
            res.redirect('/')
        } else {
            res.render('signup')
        }
    }
})

module.exports = router;

const express = require('express')
const {getAllSports, getSportsByDificulty, getSportsByName, getSportsByType, getSportsByCoach} = require('../services/sportService.js')
const {getAllCoaches} = require('../services/coachService.js')

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
    res.render('index', {sports: getAllSports(), coach: getAllCoaches()})
})

router.get('/type', checkSignIn, (req, res) => {
    res.redirect('/')
})

router.get('/coach', checkSignIn, (req, res) => {
    res.redirect('/')
})

router.get('/name', checkSignIn, (req, res) => {
    res.redirect('/')
})

router.get('/difficulty', checkSignIn, (req, res) => {
    res.redirect('/')
})

router.post('/type', checkSignIn, (req, res) => {
    res.render('index', {sports: getSportsByType(req.body.type), coach: getAllCoaches()})
})

router.post('/coach', checkSignIn, (req, res) => {
    res.render('index', {sports: getSportsByCoach(req.body.coach), coach: getAllCoaches()})
})

router.post('/name', checkSignIn, (req, res) => {
    res.render('index', {sports: getSportsByName(req.body.name), coach: getAllCoaches()})
})

router.post('/difficulty', checkSignIn, (req, res) => {
    res.render('index', {sports: getSportsByDificulty(req.body.difficulty), coach: getAllCoaches()})
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

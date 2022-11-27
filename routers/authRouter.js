const express = require('express')
const {getAllSports, getSportsByDificulty, getSportsByName, getSportsByType, getSportsByCoach, getSportsCounts} = require('../services/sportService.js')
const {getAllCoachV} = require('../services/coachService.js')

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

router.get('/', checkSignIn, async (req, res) => {
    res.render('index', {sports: await getAllSports(), coach: await getAllCoachV(), count: await getSportsCounts()})
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

router.post('/type', checkSignIn, async (req, res) => {
    res.render('index', {sports: await getSportsByType(req.body.type), coach: await getAllCoaches()})
})

router.post('/coach', checkSignIn, async (req, res) => {
    res.render('index', {sports: await getSportsByCoach(req.body.coach), coach: await getAllCoaches()})
})

router.post('/name', checkSignIn, async (req, res) => {
    res.render('index', {sports: await getSportsByName(req.body.name), coach: await getAllCoaches()})
})

router.post('/difficulty', checkSignIn, async (req, res) => {
    res.render('index', {sports: await getSportsByDificulty(req.body.difficulty), coach: await getAllCoaches()})
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

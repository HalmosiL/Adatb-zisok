const express = require('express')
const router = express.Router()

const {getAllSportMan, addSportMan, deleteSportMan} = require('../services/sportmanService')

const {checkSignIn} = require('../auth')

router.get('/', checkSignIn, (req, res) => {
    res.render('comments', {sportMan: getAllSportMan()})
})

router.post('/add', checkSignIn, (req, res) => {
    addSportMan(req.body.name, req.body.age, req.body.height, req.body.weight, req.body.sportBranch)
    res.redirect('/comments/')
})

router.post('/delete', checkSignIn, (req, res) => {
    deleteSportMan(req.body.id)
    res.redirect('/comments/')
})

module.exports = router
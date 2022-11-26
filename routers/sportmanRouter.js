const express = require('express')
const router = express.Router()

const {getAllSportMan, addSportMan, deleteSportMan} = require('../services/sportmanService')

const {checkSignIn} = require('../auth')

router.get('/', checkSignIn, (req, res) => {
    res.render('sportman', {sportMan: getAllSportMan()})
})

router.post('/add', checkSignIn, (req, res) => {
    addSportMan(req.body.name, req.body.age, req.body.height, req.body.weight, req.body.sportBranch)
    res.redirect('/sportman/')
})

router.post('/delete', checkSignIn, (req, res) => {
    deleteSportMan(req.body.id)
    res.redirect('/sportman/')
})

module.exports = router
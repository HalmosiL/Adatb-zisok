const express = require('express')
const router = express.Router()

const {getAllSportMan, addSportMan, deleteSportMan} = require('../services/sportmanService')
const {getAllSports} = require('../services/sportService.js')
const {checkSignIn} = require('../auth')

router.get('/', checkSignIn, async (req, res) => {
    console.log(await getAllSports())
    res.render('sportman', {sportMan: await getAllSportMan(), sports: await getAllSports()})
})

router.post('/add', checkSignIn, (req, res) => {
    addSportMan(req.body.name, req.body.age, req.body.height, req.body.weight, req.body.type)
    res.redirect('/sportman/')
})

router.post('/delete', checkSignIn, (req, res) => {
    deleteSportMan(req.body.id)
    res.redirect('/sportman/')
})

module.exports = router
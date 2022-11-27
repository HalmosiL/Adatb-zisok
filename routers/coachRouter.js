const express = require('express')
const router = express.Router()

const {checkSignIn} = require('../auth')
const {getAllCoaches, addCoach, deleteCoach, updateCoach, getAllCoachV} = require('../services/coachService')

router.get('/', checkSignIn, async (req, res) => {
    res.render('coach', {coach: await getAllCoaches(), coachV: await getAllCoachV()})
})

router.post('/add', checkSignIn, (req, res) => {
    addCoach(req.body.type, req.body.name)
    res.redirect("/coachlist/")
})

router.post('/delete', checkSignIn, (req, res) => {
    deleteCoach(req.body.id)
    res.redirect("/coachlist/")
})

router.post('/update', checkSignIn, (req, res) => {
    res.render('modifyCoach', {id: req.body.id})
})

router.post('/updateValue', checkSignIn, (req, res) => {
    updateCoach(req.body.type, req.body.name, req.body.id)
    res.redirect('/coachlist/')
})

module.exports = router
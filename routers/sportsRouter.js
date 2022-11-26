const express = require('express')
const {checkSignIn} = require('../auth')
const {deleteByID, addElement, updateElement} = require('../services/sportService')
const {getAllCoaches} = require('../services/coachService')

const router = express.Router()

router.post('/add', checkSignIn, (req, res) => {
    addElement(
        req.body.type,
        req.body.name,
        req.body.difficulty,
        req.body.coach
    )

    res.redirect('/')
})

router.post('/delete', checkSignIn, (req, res) => {
    console.log(req.body.id)
    deleteByID(req.body.id)
    res.redirect('/')
})

router.post('/update', checkSignIn, (req, res) => {
    res.render('modifySport', {coach: getAllCoaches(), id: req.body.id})
})

router.post('/updateValues', checkSignIn, (req, res) => {
    updateElement(
        req.body.id,
        req.body.type,
        req.body.name,
        req.body.difficulty,
        req.body.coach
    )

    res.redirect('/')
})

module.exports = router;
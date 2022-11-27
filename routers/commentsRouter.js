const express = require('express')
const router = express.Router()

const {getAllCoachV} = require('../services/coachService.js')
const {getAllComments, addComment, deleteComments, avgPoints, goodComments} = require('../services/commentsService.js')

const {checkSignIn} = require('../auth')

router.get('/', checkSignIn, async (req, res) => {
    console.log(await goodComments())
    res.render('comments', {comments: await getAllComments(), coach: await getAllCoachV(), avg: await avgPoints(), goodComents: await goodComments()})
})

router.post('/add', checkSignIn, (req, res) => {
    addComment(req.body.text, req.body.point, req.body.coach)
    res.redirect('/comments/')
})

router.post('/delete', checkSignIn, (req, res) => {
    deleteComments(req.body.id)
    res.redirect('/comments/')
})

module.exports = router
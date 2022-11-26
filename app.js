const express = require('express');
const app = express();
const path = require("path")

const bodyParser = require('body-parser');

const session = require('express-session');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

//routers
const autRouter = require("./routers/authRouter.js")
const sportsRouter = require("./routers/sportsRouter.js")
const coachRouter = require("./routers/coachRouter.js")
const sportmanRouter = require("./routers/sportmanRouter.js")

app.use('/', autRouter);
app.use('/sports/', sportsRouter);
app.use('/coachlist/', coachRouter);
app.use('/sportman/', sportmanRouter);

app.listen(3000);
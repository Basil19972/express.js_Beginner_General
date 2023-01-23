const express = require('express')
const { json } = require('express/lib/response')
const app = express()

/*Praktischer weg um Static HTML Seite zu rendern
 so werden alle seiten im public ordner zugreifbar
  http://localhost:3000/test/test.html
  http://localhost:3000*/
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.set('view engine', 'ejs')



/*get request logger ist eine funktion die so aufgerufen werden kann
 jedes ma wenn diese spezifische get request aufgerufen wird. Man könnte auch mehrere Middleware Funktionen
 so implementieren: 
 app.get('/', logger,logger,logger (req, res) => {}
 ausserdem zu shene wie man eine nciht statische html page rendern kann 
 und z.B einen text üergeben kann der sngezeigt wird
*/
app.get('/', logger, (req, res) => {
    console.log('Here')
    res.render('index', { text: "World" })
})

//importieren und anwenden dier UserRouters
const userRouter = require('./routes/users')
app.use('/users', userRouter)

/*Weiteres Beispiel von Middleware vergleichbar mit Service Layer
Jede MiddleWare nimmt die gleichen parameter entgegen(req,res,next)*/
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.listen(3000)
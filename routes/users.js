const express = require('express')
const router = express.Router()

//dieser logger kann auch in routes verwendet werden 
router.use(logger)



// an other get request
router.get('/', (req, res) => {
    // to acces queryes as /?name=Kyle
    console.log(req.query.name)
    res.send("User list ")
})

//diese route sollte über der :id route sein 
//sonst wrd das wort /new als parameter genommen
router.get('/new', (req, res) => {
    res.render('users/new', { firstName: "Basil" })
})


router.post('/', (req, res) => {
    const isValid = true
    if (isValid) {
        users.push({ firstName: req.body.firstName })
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("error")
        res.render('users/new', { firstName: req.body.firstName })
    }
})


//da put delete und update sehr oft verwendet werden 
//gibt es eine gute möglichkeit diese mit der selben url zu verwenden
//optimierte Art:
router.route('/:id').get((req, res) => {
    console.log(req.user)
    res.send(`Get User With ID ${req.params.id}`)
}).put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`)
}).delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`)
})
//nicht optimierte Art: 
/*
router.get('/:id', (req, res) => {
    req.params.id
    res.send(`Get User With ID ${req.params.id}`)
})
router.put('/:id', (req, res) => {
    req.params.id
    res.send(`Update User With ID ${req.params.id}`)
})
router.delete('/:id', (req, res) => {
    req.params.id
    res.send(`Delete User With ID ${req.params.id}`)
})
*/


//dumy Usersdaten
const users = [{ name: "Elias" }, { name: "Rickson" }]

/*diese funktion wird ausgeführt 
wenn der im Browser übermittelte Pfad eine id hat
diese param wird middleware genannt und kann Bussines logik 
enthalten somit muss code nicht redundant implementiert werden.*/
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    //diese funktion wird uasgeführt um wieder aus der funktion zu kommen 
    //und die restlichen sachen machen zu assen wir z.B eine response zu geben 
    next()
})


/*Weiteres Beispiel von Middleware vergleichbar mit Service Layer
Jede MiddleWare nimmt die gleichen parameter entgegen(req,res,next)*/
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}




module.exports = router
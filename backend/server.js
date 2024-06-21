const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const corsOption = {
    origin: 'http://localhost:8081'
}
require('dotenv').config()
console.log(process.env)

app.use(cors(corsOption))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./app/models')
db.connex.sync()
//test
app.get('/', (req, res) => {
    res.json({ message: 'Welcome' })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

require('./app/routes/utilisateur/utilisateur.routes')(app);
require('./app/routes/privilege/privilege.routes')(app);
require('./app/routes/ville/ville.routes')(app);
require('./app/routes/province/province.routes')(app);



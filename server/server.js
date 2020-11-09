require('./config/config')

const express = require('express')
const mongoose = require('mongoose');

const path = require('path');
const app = express();

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//habilitar el public

app.use(express.static(path.resolve(__dirname, '../public')))

//confgiracion gobal de rutas
app.use(require('./routes/index'));



mongoose.connect(process.env.URlDB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        throw err;

    }
    console.log('Base de Datos online');

});


app.listen(process.env.PORT, () => {
    console.log('escuchando puerto 3000');
})
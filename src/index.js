//codigo del servidor

const express = require('express')
const app= express();
const morgan= require('morgan')
const path= require('path')
const { Mongoose } = require('./database')


//configuracion
app.set('port', process.env.PORT || 3000)
app.use(express.json());

//middleware
app.use(morgan('dev'));


//rutas
app.use('/api/tareas', require('./rutas/tareas_rutas'))


// archivos estaticos

app.use(express.static(path.join(__dirname,'public')))

//inicia el server
app.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`)
})
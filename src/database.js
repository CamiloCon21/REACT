const mongoose=require('mongoose')

const URL = 'mongodb://localhost/reactmongo'

mongoose.connect(URL)
    .then(db => console.log('conectado a la base'))
    .catch(err => console.error(err))
 
module.exports = mongoose
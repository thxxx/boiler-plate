const express = require('express')
const app = express()
const port = 5000



const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Alonso:1234qwer@boilerplate.nmrsc.mongodb.net/boilerplate?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false //에러가 안뜨게 하려고
}).then(() => console.log('MongoDB Connected...'))
  .catch(err=> console.log(console.error))


app.get('/', (req,res) => res.send('Hello Node World!') )

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

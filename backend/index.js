const express = require('express')
const pool = require('./pool.js')

const app = express()
const port = 3000

app.use("/doctors", require("./routes/viewDoctors.js"))

let PORT = 8000

pool.connect( (err) => {
    if(err){

        console.log(err)
    }
    else{
     
        app.listen(PORT, () => {
            console.log(`Server has started on http://localhost:${PORT}`)
        })
    }   
} 
)
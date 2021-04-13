const pg = require('pg')

function connectDatabase(){
    const pool = new pg.Pool ({
        user        :   'postgres',
        password    :   'postgres',
        database    :   'doctors',
        host        :   'localhost'
    })

    return pool
}

module.exports = connectDatabase();
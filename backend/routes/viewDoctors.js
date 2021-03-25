const router = require("express").Router()
const pool = require("../pool")


router.get("/verified", async (req, res) => {
    try {
     
        const doctors = await pool.query('SELECT * from doctors where verified = True')

        res.json(doctors.rows)


    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})



router.get("/pending", async (req, res) => {
    try {
     
        const doctors = await pool.query('SELECT * from doctors where verified = False')

        res.json(doctors.rows)


    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})
module.exports = router;
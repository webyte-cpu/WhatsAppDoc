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

router.get("/verified", async (req, res) => {
    try {
     
        const doctors = await pool.query('SELECT * from doctors where verified = True')

        res.json(doctors.rows)


    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})



router.patch("/:id", async (req, res) => {
    try {
        
        const { id } = req.params
        const doctors = await pool.query('UPDATE doctors SET verified = True WHERE id = $1 RETURNING *' , [id])

        res.json(doctors.rows[0])


    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})


module.exports = router;
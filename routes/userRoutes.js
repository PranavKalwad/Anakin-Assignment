const express = require("express")
const router = express.Router()
const isUserLoggedIn = require("../authController/userController")
const searchForSeats =
  require("../dataAccess/registrationAndLoginDataAccess").searchForSeats

router.post('/get/seats',isUserLoggedIn, async (req, res) => {
    const {src, dest} = req.body
    if(!src || !dest){
        return res.status(400).json({msg: "Please provide source and destination"})
    }
    try{
        const result = await searchForSeats(src, dest);
        res.status(200).json({result})
    }catch(err){
        console.log(err)
        res.status(500).json({msg: "Internal server error"})
    }
})



module.exports = router

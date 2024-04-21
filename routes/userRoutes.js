const express = require("express")
const router = express.Router()
const isUserLoggedIn = require("../authController/userController")
const searchForSeats =
  require("../dataAccess/registrationAndLoginDataAccess").searchForSeats
const bookSeats = require("../dataAccess/registrationAndLoginDataAccess").bookSeats
const getBookedSeats = require("../dataAccess/registrationAndLoginDataAccess").getBookedSeats

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

router.post('/book/seats',isUserLoggedIn, async (req, res) => {
    const {src, dest, seats_booked,train_id} = req.body
    const user_id = req.headers.id
    if(!src || !dest || !seats_booked || !train_id){
        return res.status(400).json({msg: "Please enter all the fields"})
    }
    try{
        const result = await bookSeats(src, dest, seats_booked,train_id,user_id);
        res.status(200).json({result})
    }catch(err){
        console.log(err)
        res.status(500).json({msg: "Internal server error"})
    }
})

router.get('/booked/seats',isUserLoggedIn, async (req, res) => {
    const user_id = req.headers.id
    try{
        const result = await getBookedSeats(user_id);
        res.status(200).json({result})
    }catch(err){
        console.log(err)
        res.status(500).json({msg: "Internal server error"})
    }
})


module.exports = router

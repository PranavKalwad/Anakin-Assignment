const express = require("express");
const router = express.Router();
const validateApiKey = require("../authController/adminController")
const createTrain = require("../dataAccess/registrationAndLoginDataAccess").createTrain

router.post("/add/new/train", validateApiKey, async (req, res) => {
    const admin_id = req.headers.id
    if(!admin_id){
        return res.status(400).json({msg:"Please login first"})
    }
    const {trainName,trainNumber,seats,src,dest} = req.body;
    if(!trainName || !trainNumber || !seats || !src || !dest){
        return res.status(400).json({msg:"Please enter all fields"})
    }
    try {
        const newTrain = {
            train_name: trainName,
            Train_no: trainNumber,
            seats: seats,
            src: src,
            dest: dest,
            admin_id: admin_id
        };
        await createTrain(newTrain);
        res.status(200).json({
            msg: "Train added successfully",
            trainName: newTrain.train_name,
            trainNumber: newTrain.Train_no,
            seats: newTrain.seats,
            src: newTrain.src,
            dest: newTrain.dest
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" });
    }
})

module.exports = router;
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const getUserByNameAdmin =
  require("../dataAccess/registrationAndLoginDataAccess").getUserByNameAdmin

router.post("/admin", async (req, res) => {
  const { apikey } = req.headers

  if (apikey !== process.env.ADMIN_API_KEY) {
    return res.status(401).send("You are not authorized to perform this action")
  } else {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).send("Please provide username and password")
    }

    const checkUser = await getUserByNameAdmin(username)

    if (checkUser.length === 0) {
      return res.status(400).send("User does not exist.Please sign up")
    }
    
    const validPassword = await bcrypt.compare(password, checkUser[0].password)
    if (!validPassword) {
      return res.status(400).send("Invalid password")
    }

    res.status(200).send("Login successful")
  }
})

module.exports = router

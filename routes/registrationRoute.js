const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const createUserAdmin =
  require("../dataAccess/registrationAndLoginDataAccess").createUserAdmin
const getUserByNameAdmin =
  require("../dataAccess/registrationAndLoginDataAccess").getUserByNameAdmin
const getUserByName =
  require("../dataAccess/registrationAndLoginDataAccess").getUserByName
const createUser =
  require("../dataAccess/registrationAndLoginDataAccess").createUser
const generateAcessToken = require("../utils/generateAccessToken")

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body
  if (!username || !password || !role) {
    return res.status(400).json({ msg: "Please enter all fields" })
  }
  try {
    if (role === "admin") {
      const existingUser = await getUserByNameAdmin(username)
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = {
        username: username,
        password: hashedPassword,
        role: role,
      }
      await createUserAdmin(newUser)

      res
        .status(200)
        .json({ msg: "Admin registered successfully", username, role })
    } else {
      const existingUser = await getUserByName(username)
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = {
        username: username,
        password: hashedPassword,
        role: role,
      }
      await createUser(newUser)

      const token = generateAcessToken(username, role)

      res
        .status(200)
        .json({ msg: "User registered successfully", username, role, token })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Internal Server Error" })
  }
})

module.exports = router

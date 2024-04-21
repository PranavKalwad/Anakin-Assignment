const pool = require("../utils/db")

function createUserAdmin(newUser) {
  let sql = "INSERT INTO admin SET ?;"
  return new Promise((resolve, reject) => {
    pool.query(sql, newUser, (err, result) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

function getUserByNameAdmin(username) {
  let sql = "SELECT * FROM admin WHERE username = ?;"
  return new Promise((resolve, reject) => {
    pool.query(sql, username, (err, result) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

function getUserByName(username) {
  let sql = "SELECT * FROM users WHERE username = ?;"
  return new Promise((resolve, reject) => {
    pool.query(sql, username, (err, result) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

function createUser(newUser) {
  let sql = "INSERT INTO users SET ?;"
  return new Promise((resolve, reject) => {
    pool.query(sql, newUser, (err, result) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

function createTrain(newTrain){
  let sql = "INSERT INTO train SET ?;"
  return new Promise((resolve, reject) => {
    pool.query(sql, newTrain, (err, result) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}


function searchForSeats(src, dest){
  let sql = "SELECT Train_no,train_name,seats FROM train WHERE src = ? AND dest = ?;"
  return new Promise((resolve, reject) => {
    pool.query(sql, [src, dest], (err, result) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

module.exports = {
  createUserAdmin,
  getUserByNameAdmin,
  getUserByName,
  createUser,
  createTrain,
  searchForSeats
}

const { get } = require('../routes/registrationRoute')
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

function bookSeats(src, dest, seats_booked,train_id,user_id){
  let sql = "UPDATE train SET seats = seats - ? WHERE src = ? AND dest = ? and Train_no = ?;"
  return new Promise((resolve, reject) => {
    pool.query(sql, [seats_booked, src, dest,train_id], async (err, result) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      const res = await updateBookingTable(user_id,train_id,seats_booked,src,dest)
      resolve(result)
      return resolve(res)
    })
  })
}

function updateBookingTable(user_id,train_id,seats_booked,src,dest){
  let sql = "INSERT INTO booking SET ?;"
  let booking = {
    user_id: user_id,
    Train_no: train_id,
    seats_booked: seats_booked,
    src: src,
    dest: dest
  }
  return new Promise((resolve, reject) => {
    pool.query(sql, booking, (err, result) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

function getBookedSeats(user_id){
  let sql = "SELECT * FROM booking WHERE user_id = ?;"
  return new Promise((resolve, reject) => {
    pool.query(sql, user_id, (err, result) => {
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
  searchForSeats,
  bookSeats,
  getBookedSeats
}

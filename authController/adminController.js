function validateApiKey(req, res, next) {
  const { apikey } = req.headers

  if (!apikey) {
    return res
      .status(401)
      .send({ msg: "You are not authorized to perform this action" })
  }

  if (apikey !== process.env.ADMIN_API_KEY) {
    return res
      .status(401)
      .send({ msg: "You are not authorized to perform this action" })
  }

  next()
}

module.exports = validateApiKey

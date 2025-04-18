const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw Error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    // Verify token
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (error) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};

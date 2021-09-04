const jwt = require("jsonwebtoken");
const JWT_SECRET = "NOT_SO_SECRET";

const fetchUser = (req, res, next) => {
  // Getting token
  const token = req.header("auth-token");

  // Verifying Token
  if (!token)
    return res.status(401).send("Please authenticate using a valid token.");

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send("Please authenticate using a valid token.");
  }
};

module.exports = fetchUser;

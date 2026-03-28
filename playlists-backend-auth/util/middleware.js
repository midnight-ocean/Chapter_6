const jwt = require("jsonwebtoken");
const reqLogger = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.path}`);
  //mask the password if there is any 
  const body = req.body?.password
  ? {...req.body, password: "*****"}
  : req.body; 
  console.log("Request Body:", body);
  console.log("----------------------------");
  // dont forget to call next method like mr.sen
  next();
};

const authenticateToken = (req, res, next) => {
const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "jwt must be provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "invalid or expired token" });
  }
};

module.exports = { reqLogger, authenticateToken };
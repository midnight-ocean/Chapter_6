const reqLogger = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.path}`);
  console.log("Request Body:", req.body);
  //mask the password if there is any 
  const body = req.body?.password
  ? {...req.body, password: "*****"}
  : req.body; 
  console.log("----------------------------");
  // dont forget to call next method like mr.sen
  next();
};

module.exports = {reqLogger};
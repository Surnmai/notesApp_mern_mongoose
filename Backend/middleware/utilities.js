const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(`Bearer token: ${authHeader}`);

  const token = authHeader && authHeader.split(" ")[1];
  // console.log(`Bearer token splitted: ${token}`);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied, No token provided, You must login first",
    });
  }

  try {
    // get/extract user information after signing In by the user
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    // console.log(decodedToken);

    req.user = decodedToken; //this holds the user information like fullName,email and ID
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue",
    });
  }
};

module.exports = authenticateToken;

const jwt = require("jsonwebtoken");
const User = require("../models/book.model");
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

  

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized, token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);


    req.user = decoded;


    console.log(req.user);

    next();

  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "UnAuthorized,Invalid User" });
  }
};

module.exports = authMiddleware;

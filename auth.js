const jwt = require("jsonwebtoken");
const secretKey = "ukllaundry";
auth = (req, res, next) => {
  let header = request.headers.authorization;
  //header = Bearer

  //data tokennya
  let token = header && header.split(" ")[1];

  if (token == null) {
    return response.status(401).json({
      message: `Unauthorized`,
    });
  } else {
    let jwtHeader = {
      algorithm: "HS256",
    };

    //verivikasi token yang diberikan
    jwt.verify(token, secretKey, jwtHeader, (error) => {
      if (error) {
        return response.status(401).json({
          message: `Invalid token`,
        });
      } else {
        next();
      }
    });
  }
};

module.exports = auth;
/**
 * It takes the token from the request header, verifies it, and adds the userId to the request object
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that we call when we want to move on to the next middleware.
 */
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustum = token.length < 500;
    let decodeData;
    if (token && isCustum) {
      decodeData = jwt.verify(token, "test");
      req.userId = decodeData?.id;
    } else {
      decodeData = jwt.decode(token);
      req.userId = decodeData?.sub;
    }
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default protect;

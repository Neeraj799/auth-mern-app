import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";

const userAuthCheck = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is required",
    });
  }

  try {
    const decoded = jwt.verify(auth, envConfig.general.APP_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is wrong or expired" });
  }
};

export { userAuthCheck };

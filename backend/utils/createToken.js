import jwt from "jsonwebtoken";

// Generate a JWT token 
const generateToken = (res, userId) => {

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

  // Set the token as a cookie in the response
  res.cookie("jwt", token, {
    httpOnly: false, 
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60 * 1000, // Expiration: 30 days
  });

  return token;
};

export default generateToken;






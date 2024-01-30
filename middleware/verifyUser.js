import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  console.log("Entered");
  try {
    const token = req.header("Authorization");
    console.log("Token", token);
    // Check if token exist or not
    if (!token) {
      console.log("1");
      return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      console.log(token.startsWith("Bearer "));
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified", verified, "3");
    req.user = verified;
    next();
  } catch (err) {
    console.log("Entereed Error");
    return res.status(500).json({ error: err.message });
  }
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const { authenticateToken } = require("../util/middleware");

const { User } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const passCheck = await bcrypt.compare(password, user.password);

    if (!passCheck)
      return res.status(401).json({ message: "Invalid Credentials" });

    const tokenPayload = { username: user.username, id: user.id };

    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.json({
      message: "Login Successful",
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//protected route demonstration 

router.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Authorized", user: req.user });
});

// logout to clear the cookies
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.json({ message: "Logged out" });
});

module.exports = router;
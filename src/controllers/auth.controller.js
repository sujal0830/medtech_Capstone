const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password || !role)
      return res.status(400).json({ message: "All fields required" });

    const existing = await userModel.findUserByEmail(email);

    if (existing)
      return res.status(409).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.createUser(
      full_name,
      email,
      hash,
      role
    );

    res.status(201).json(user);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Registration failed" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);

    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);

    if (!ok)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Login failed" });
  }
};

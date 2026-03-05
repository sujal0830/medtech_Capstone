const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */

exports.register = async (req, res) => {
  try {

    const { full_name, email, password, user_type } = req.body;

    /* REQUIRED FIELD CHECK */

    if (!full_name || !email || !password || !user_type) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    /* EMAIL VALIDATION */

    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    /* PASSWORD VALIDATION */

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    /* ROLE VALIDATION */

    const allowedRoles = ["ADMIN", "CONSULTANT", "PATIENT"];

    if (!allowedRoles.includes(user_type)) {
      return res.status(400).json({
        message: "Invalid user role"
      });
    }

    /* CHECK IF EMAIL ALREADY EXISTS */

    const userExists = await User.findOne({
      where: { email }
    });

    if (userExists) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    /* HASH PASSWORD */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* CREATE USER */

    const user = await User.create({
      full_name,
      email,
      password_hash: hashedPassword,
      user_type
    });

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });

  }
};

/* ================= LOGIN ================= */

exports.login = async (req, res) => {
  try {

    const { email, password, user_type } = req.body;

    /* FIND USER BY EMAIL + ROLE */

    const user = await User.findOne({
      where: { email, user_type }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email, password or role"
      });
    }

    /* CHECK PASSWORD */

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    /* GENERATE JWT */

    const token = jwt.sign(
      {
        id: user.id,
        role: user.user_type
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.user_type
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Login failed"
    });

  }
};
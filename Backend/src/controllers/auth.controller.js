
const User =require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try{
        const {full_name, email, password, user_type} = req.body;

        // Server sider validation
        if(!full_name || !email || !password || !user_type){
            return res.status(400).json({message: "All fields required"});

        }
        // Check if user already exists
        const userExists = await User.findOne({where: {email}});
        if(userExists){
            return res.status(409).json({message: "Email already exists"});
        }
        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword); // Debugging line to check the hashed password
        // Create user
        
        const user = await User.create({
            full_name,
            email,
            password_hash : hashedPassword,
            user_type : user_type
        });
        res.status(201).json(
            {
                message: "User created successfully",
                user
            });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Registration failed"});
    }
}

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        // Check if user exists
         const user = await User.findOne({where: {email}}) ;
        if(!user)
        {
            return res.status(401).json(
                {message: "User Not Found"}
            )
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch){
            return res.status(401).json(
                {message: "Invalid Credentials"}
            )
        }
        // Generate JWT Token
         const token = jwt.sign(
             {id: user.id, role: user.role},
             process.env.JWT_SECRET,
             {expiresIn: "8h"}
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
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Login failed"});
    }
}
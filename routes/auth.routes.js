const {Router} = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const User = require("../models/User");
const router = Router();



// /api/auth/register
router.post("/register",
[
  check("userName", "incorrect login").exists(),
  check("password", "incorrect password").isLength({min: 6})
],
async (req, res)=> {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        massage: "incorrect data during registration"
      });
    }
    
    const {userName, password, type} = req.body;

    const candidate = await User.findOne({ userName }); // {userName: userName}

    if(candidate) {
      return res.status(400).json({massage: "such user already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = new User({ 
      type, 
      userName, 
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({massage: "User save"});

    
  } catch (e) {
    res.status(500).json({massage: "Something went wrong"});
  }
});

//======================================================
// /api/auth/login
router.post("/login",
[
  check("userName", "incorrect login").exists(),
  check("password", "incorrect password").isLength({min: 6})
],
async (req, res)=> {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        massage: "incorrect data during login"
      });
    }

    const {userName, password} = req.body;
    const user = await User.findOne({ userName });

    if(!user) {
      return res.status(400).json({massage: "User is not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      res.status(400).json({massage: "incorrect password"});
    }
    const token = jwt.sign( 
      { userId: user._id,
      userType: user.type }, 
      config.get("jwtSecret"),
      { expiresIn: "1h" } 
    );

    res.json({ token, userId: user._id, userType: user.type }); // status 200 default value;

  } catch (e) {
    res.status(500).json({massage: "Something went wrong"});
  }

});

module.exports = router;
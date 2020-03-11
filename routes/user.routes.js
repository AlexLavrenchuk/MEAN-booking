const {Router} = require("express");
const User = require("../models/User");
const router = Router();
const auth = require("../middleware/auth.middleware");


// /api/user/getCurrentUser
router.get("/getCurrentUser", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if(!user) res.status(401).json({message: 'user not find'});

    res.json(user);

  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// /api/user/get
router.get("/get", async (req, res) => {
  try {
    
    res.json({message: 'work'});

  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

module.exports = router;
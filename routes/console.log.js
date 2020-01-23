const {Router} = require("express");
const router = Router();

router.get("/log", async (req, res)=> {
  const massege = "route work";
  console.log(massege);
  
  res.json({ massage });
});

module.exports = router;
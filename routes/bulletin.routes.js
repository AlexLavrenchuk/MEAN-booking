const {Router} = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Bulletin = require("../models/Bulletin");
const auth = require("../middleware/auth.middleware");
const router = Router();


// /api/bulletin/getAll
router.get("/getAll", async (req, res)=> {
  try {
    const bulletinAll = await Bulletin.find();
    
    res.json(bulletinAll);

  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// /api/bulletin/getSearch/{{value}}
router.get("/getSearch/:search", async (req, res)=> {
  try {
    const {search: searchValue} = req.params;
    
    const bulletinAll = await Bulletin.find();
    let searchBulletins = [];
    if(searchValue) {
      searchBulletins = bulletinAll.filter(bulletin => {
        return (bulletin.title.indexOf(searchValue) || bulletin.descriptionText.indexOf(searchValue)) >= 0 ;
      });
    }
    res.json(searchBulletins);
  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// /api/bulletin/getByCurrentUser
router.get("/getByCurrentUser", auth, async (req, res)=> {
  try {
    const bulletinAll = await Bulletin.find( { owner: req.user.userId } );
    res.json(bulletinAll);
  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// /api/bulletin/saveWithPhoto
router.post("/saveWithPhoto", auth, async (req, res)=> {
  try {
    const {title, descriptionText} = JSON.parse(req.body.data);
    const imageArr =  req.files;

    let newArrImg = imageArr.map(img => `/assets/images/picture/${img.originalname}`);

    const bulletin = new Bulletin({
      owner: req.user.userId,
      title: title,
      descriptionText: descriptionText,
      images: newArrImg,
    });
    await bulletin.save();
    res.status(201).json({message: "add new bulletin"});
  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// /api/bulletin/saveWithoutPhoto
router.post("/saveWithoutPhoto", auth, async (req, res)=> {
  try {
    const {title, descriptionText} = req.body;

    const bulletin = new Bulletin({
      owner: req.user.userId,
      title: title,
      descriptionText: descriptionText,
    });
    await bulletin.save();
    res.status(201).json({message: "add new bulletin"});
  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// /api/bulletin/getById/:id
router.get("/getById/:id", auth, async (req, res)=> {
  try {
    const bulletin = await Bulletin.findById(req.params.id);
    res.json(bulletin);

  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// /api/bulletin/delete/:id
router.delete("/delete/:id", auth, async (req, res)=> {
  try {
    const bulletin = await Bulletin.findById(req.params.id);
    await bulletin.remove();
    res.json(bulletin);
  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

module.exports = router;
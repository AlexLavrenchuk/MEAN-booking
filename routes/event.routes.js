const {Router} = require("express");
const router = Router();
const Event = require("../models/Event");


// /api/event/getAll
router.get("/getAll", async (req, res)=> {
  try {
    const events = await Event.find();
    
    res.json(events);

  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});


// /api/event/addNew
router.post("/addNew", async (req, res)=> {
  try {
    const { title, start, end } = req.body;
    
    const duration = end - start;
    const event = new Event({
      start,
      title,
      duration
    });
    await event.save();
    res.status(201).json({message: "add new event"});
  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// /api/event/delete/:id
router.delete("/delete/:id", async (req, res)=> {
  try {
    const event = await Event.findById(req.params.id);
    await event.remove();
    res.json(event);
  } catch (e) {
    res.status(500).json({message: "Something went wrong"});
  }
});

module.exports = router;
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
// const upload = multer();
// const upload = multer({
//   dest: "photo",
//   limits: {
//     files: 5, // allow up to 5 files per request,
//     fieldSize: 2 * 1024 * 1024 // 2 MB (max file size)
//   },
//   fileFilter: (req, file, cb) => {
//     // allow images only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image are allowed.'), false);
//     }
//     cb(null, true);
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/src/assets/images/picture/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
});

var upload = multer({ storage: storage });

const app = express();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array("photo")); 
app.use(express.static('public'));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/bulletin", require("./routes/bulletin.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/event", require("./routes/event.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`App hes been started on port ${PORT}...`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
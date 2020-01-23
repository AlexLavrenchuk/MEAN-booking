const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

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
app.use("/api/c", require("./routes/console.log"));

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
    console.log("Server Error", e.massage);
    process.exit(1);
  }
}

start();
const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  owner: {type: Types.ObjectId, ref: "User"},
  title: {type: String, required: true},
  descriptionText: {type: String, required: true},
  images: {type: Array},
  createDate: {type: Date, default: Date.now},
  starRating: {type: Number, default: 0},
  currentLike: {type: Number, default: 0},
  currentVisibility: {type: Number, default: 0}
});

module.exports = model("Bulletin", schema);
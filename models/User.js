const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  id: {type: String},
  type: {type: String, required: true},
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  createDate: {type: Date, default: Date.now},
  token: {type: String},
  userAvatar: {type: String, default: ""},
  bulletins: [{type: Types.ObjectId, ref: 'Bulletin'}]
});

module.exports = model("User", schema);
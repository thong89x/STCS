const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username :  { type: String, required: true },
  password :{ type: String, required: true},
  active: {
    type: Boolean,
    default: true
  },
  roles: {
    type: String,
    default: "user"
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

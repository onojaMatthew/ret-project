const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

exports.User = User;
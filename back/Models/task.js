// const mongoose = require("mongoose");
const mongoose = require("mongoose")
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    unique:true,
    trim: true,
    maxlength: [20, "Name can't be more than 20 chars"]
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("entry", TaskSchema);

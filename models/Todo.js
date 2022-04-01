const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
    },
    reminder: {
      type: String,
    },
    isDone: {
      type: Boolean,
    },
    isUpdated: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);

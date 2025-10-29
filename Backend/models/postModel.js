const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
      },
    ],
    likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" } 
  ],
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

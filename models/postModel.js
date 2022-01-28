import mongoose from "mongoose";
import slugify from "slugify";
import Comment from "./commentModel.js";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Category = mongoose.model("Category", categorySchema);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    slug: String,
    desc: {
      type: String,
      required: true,
    },
    categoryList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// postSchema.virtual("postdesc", {
//   ref: "Comment",
//   foreignField: "post",
//   localField: "_id",
// });

postSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

postSchema.pre("findOneAndDelete", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  await Comment.deleteMany({ post: docToUpdate._id.toString() });
  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;

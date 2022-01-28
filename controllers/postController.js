import catchAysnc from "express-async-handler";
import Post, { Category } from "../models/postModel.js";

const postController = {
  getAllPosts: catchAysnc(async (req, res) => {
    let posts;
    let query;
    let count;
    count = Number(await Post.countDocuments());
    const qNew = req.query.new;
    if (qNew) {
      posts = await Post.find()
        .populate("categoryList")
        .sort({ createdAt: -1 })
        .limit(6);
    } else {
      query = Post.find().sort({ createdAt: -1 }).populate("categoryList");
      let page = req.query.page * 1 || 1;
      let limit = 12;
      let skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        if (skip >= count) {
          return res.status(401).json("page doesn't exists");
        }
      }
      posts = await query;
    }
    if (!posts) {
      return res.status(401).json("posts not found");
    }
    res.status(201).json({
      result: posts.length,
      totalPosts: count,
      pages: Math.ceil(count / 12),
      data: posts,
    });
  }),
  getPost: catchAysnc(async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "categoryList"
    );
    if (!post) {
      return res.status(401).json("Post not found");
    }
    res.status(201).json(post);
  }),
  createPost: catchAysnc(async (req, res) => {
    const newPost = await Post.create(req.body);
    if (!newPost) {
      return res.status(401).json("error occured");
    }
    res.status(201).json(newPost);
  }),
  updatePost: catchAysnc(async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(401).json("post not found");
    }
    res.status(201).json(post);
  }),
  deletePost: catchAysnc(async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(401).json("post not found");
    }
    res.status(201).json("post delete");
  }),
  getAllCategories: catchAysnc(async (req, res) => {
    const categories = await Category.find();
    if (!categories) {
      return res.status(401).json("posts not found");
    }
    res.status(201).json(categories);
  }),
  createCategory: catchAysnc(async (req, res) => {
    const newCategory = await Category.create(req.body);
    if (!newCategory) {
      return res.status(401).json("error occured");
    }
    res.status(201).json(newCategory);
  }),
  getCategoriesCount: catchAysnc(async (req, res) => {
    const categoryCount = await Post.aggregate([
      {
        $unwind: "$categoryList",
      },

      {
        $group: {
          _id: "$categoryList",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categorydoc",
        },
      },
    ]);
    if (!categoryCount) {
      return res.status(401).json("error occured");
    }
    res.status(201).json(categoryCount);
  }),
  testPost: catchAysnc(async (req, res) => {}),
};

export default postController;

import catchAysnc from "express-async-handler";
import Comment from "../models/commentModel.js";

const commentController = {
  getAllComments: catchAysnc(async (req, res) => {
    const comments = await Comment.find().populate("post");
    if (!comments) {
      return res.status(401).json("comments not found");
    }
    res.status(201).json(comments);
  }),
  getAllCommentsByPost: catchAysnc(async (req, res) => {
    if (!req.body.post) req.body.post = req.params.postId;
    const comments = await Comment.find({ post: req.body.post });
    if (!comments) {
      return res.status(401).json("comments not found");
    }
    res.status(201).json(comments);
  }),
  getComment: catchAysnc(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(401).json("comment not found");
    }
    res.status(201).json(comment);
  }),
  createComment: catchAysnc(async (req, res) => {
    if (!req.body.post) req.body.post = req.params.postId;
    const newComment = await Comment.create(req.body);
    if (!newComment) {
      return res.status(401).json("error occured");
    }
    res.status(201).json(newComment);
  }),
  updateComment: catchAysnc(async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) {
      return res.status(401).json("comment not found");
    }
    res.status(201).json(comment);
  }),
  deleteComment: catchAysnc(async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(401).json("comment not found");
    }
    res.status(201).json("comment delete");
  }),
  popularPost: catchAysnc(async (req, res) => {
    const popularPost = await Comment.aggregate([
      {
        $group: {
          _id: "$post",
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          post: "$_id",
          total: 1,
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "post",
          foreignField: "_id",
          as: "postdoc",
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 4,
      },
    ]);

    if (!popularPost) {
      return res.status(401).json("trending not found");
    }
    res.status(201).json(popularPost);
  }),
};

export default commentController;

import Comment from '../models/comment.js';
// eslint-disable-next-line no-unused-vars
import express from 'express';
import Post from '../models/post.js';
import { MongooseError } from 'mongoose';

export class CommentController {
  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async addComment(req, res) {
    try {
      const user = req.user;
      const { postId } = req.params;
      const { content } = req.body;

      const post = await Post.findById(postId);

      if (!post) {
        return res
          .status(400)
          .json({ status: false, message: 'requette invalide' });
      }

      const newComment = await Comment.create({
        content,
        post: post._id,
        author: user._id,
      });

      await post.updateOne({ comments: { $push: newComment._id } });

      res.status(200).json({ status: true, message: newComment.toObject() });
    } catch (e) {
      if (e instanceof MongooseError) {
        return res.status(400).json({ status: false, message: e.message });
      }

      return res
        .status(500)
        .json({ status: false, message: 'Erreur interne du serveur' });
    }
  }

  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async updateComment(req, res) {
    try {
      const user = req.user;
      const { postId } = req.params;
      const { commentId, content } = req.body;

      const post = await Post.findById(postId);

      if (!post) {
        return res
          .status(400)
          .json({ status: false, message: 'requette invalide' });
      }

      const existingComment = await Comment.findById(commentId);

      if (!existingComment) {
        return res
          .status(404)
          .json({ status: false, message: 'commentaire non trouvé' });
      }

      if (user._id === existingComment.author) {
        await existingComment.updateOne({ content });
      } else {
        return res
          .status(403)
          .json({ status: false, message: 'Action interdite' });
      }

      res.status(200).json({ status: true, message: 'succès' });
    } catch (e) {
      if (e instanceof MongooseError) {
        return res.status(400).json({ status: false, message: e.message });
      }

      return res
        .status(500)
        .json({ status: false, message: 'Erreur interne du serveur' });
    }
  }

  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async deleteComment(req, res) {
    try {
      const user = req.user;
      const { postId } = req.params;
      const { commentId } = req.body;

      const post = await Post.findById(postId);

      if (!post) {
        return res
          .status(400)
          .json({ status: false, message: 'requette invalide' });
      }

      const existingComment = await Comment.findById(commentId);

      if (!existingComment) {
        return res
          .status(404)
          .json({ status: false, message: 'commentaire non trouvé' });
      }

      if (user._id === existingComment.author) {
        await existingComment.deleteOne();
        post.comments = post.comments.filter((c) => c !== commentId);
        await post.save();
      } else {
        return res
          .status(403)
          .json({ status: false, message: 'Action interdite' });
      }
    } catch (e) {
      if (e instanceof MongooseError) {
        return res.status(400).json({ status: false, message: e.message });
      }

      return res
        .status(500)
        .json({ status: false, message: 'Erreur interne du serveur' });
    }
  }
}

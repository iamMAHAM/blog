import Post from '../models/post.js';
import User from '../models/user.js';
// eslint-disable-next-line no-unused-vars
import express from 'express';

class PostController {
  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async createPost(req, res) {
    try {
      const user = req.user;

      const post = await Post.create({
        ...req.body,
        author: user._id,
      });

      await User.findOneAndUpdate(
        { _id: user._id },
        {
          posts: {
            $push: post._id,
          },
        }
      );

      res.status(201).json({ status: true, post: { ...post.toObject() } });
    } catch (e) {
      res.json({ message: e.message });
    }
  }
  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */

  static async updatePost(req, res) {
    const user = req.user;
    const { id } = req.params;

    try {
      const post = await Post.findById(id);

      if (!post) {
        throw new Error('Post non trouvé');
      }

      if (post.user !== user._id) {
        throw new Error('action non authorisé');
      }

      await Post.updateOne({ id: post.id }, { ...req.body });

      return res
        .status(200)
        .json({ status: true, message: { ...post, ...req.body } });
    } catch (e) {
      res.json({ status: false, message: e.message });
    }
  }
  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */

  static async deletePost(req, res) {
    const user = req.user;
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error('post non trouvé');
      }

      if (post.useror !== user._id) {
        throw new Error('Action non authorisé');
      }

      await Post.deleteOne({ _id: id });
      res.status(200).json({ status: true });
    } catch (e) {
      //
      res.json({ status: false, message: e.message });
    }
  }
  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async getPost(req, res) {
    const { id } = req.params;

    try {
      const post = await Post.findById(id);

      if (!post) {
        throw new Error("post n'existe pas");
      }

      const fullPost = await (
        await post.populate('author', 'username fullname role email')
      ).populate('comments');

      res.status(200).json({ status: true, post: { ...fullPost.toObject() } });
    } catch (e) {
      res.json({ status: false, message: e.message });
    }
  }
}

export default PostController;

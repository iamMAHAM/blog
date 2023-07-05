import Post from '../models/post.js';
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
      const user = req.auth;

      const post = await Post.create({
        ...req.body,
        author: user._id,
      });

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
    const user = req.auth;
    const { id } = req.params;

    try {
      const post = await Post.findById(id);

      if (!post) {
        throw new Error('Post non trouvé');
      }

      if (post.author !== user._id) {
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
    const user = req.auth;
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error('post non trouvé');
      }

      if (post.author !== user._id) {
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

      const fullPost = await post.populate('author', {
        select: 'username fullname role',
      });

      res.status(200).json({ status: true, post: { ...fullPost } });
    } catch (e) {
      res.json({ status: false, message: e.message });
    }
  }
}

export default PostController;

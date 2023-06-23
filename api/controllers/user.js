import User from '../models/user.js';
// eslint-disable-next-line no-unused-vars
import express from 'express';

class UserController {
  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);

      if (user) {
        return res.status(200).json({ status: true, message: user.toObject() });
      }

      res
        .status(404)
        .json({ status: false, message: 'utilisateur non trouvé' });
    } catch (e) {
      console.log('erreur');
      res
        .status(500)
        .json({ status: false, message: 'Erreur interne du serveur' });
    }
  }

  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async createUser(req, res) {
    const { role, ...body } = req.body;

    try {
      const user = await User.create({ ...body });

      res.status(201).json({ status: true, message: user.toObject() });
    } catch (e) {
      res.json({ status: false, message: e.message });
    }
  }

  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static deleteUser(req, res) {}
  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static editUser(req, res) {}
}

export default UserController;

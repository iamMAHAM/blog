import User from '../models/user.js';
// eslint-disable-next-line no-unused-vars
import express from 'express';
import bcrypt from 'bcrypt';
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
        return res.status(200).json({
          status: true,
          message: { ...user.toObject(), password: undefined },
        });
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
    // eslint-disable-next-line no-unused-vars
    const { role, password, ...body } = req.body;

    try {
      const user = await User.create({
        ...body,
        password: await bcrypt.hash(password, await bcrypt.genSalt()),
      });

      res.status(201).json({
        status: true,
        message: { ...user.toObject(), password: undefined },
      });
    } catch (e) {
      res.json({ status: false, message: e.message });
    }
  }

  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      await User.deleteOne({ _id: id });
      res.status(200).json({ status: true, message: 'succès' });
    } catch (e) {
      res.json({ status: false, message: e.message });
    }
  }
  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async editUser(req, res) {
    // eslint-disable-next-line no-unused-vars
    const { role, password, newPassword, ...body } = req.body;
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: 'utiliseur non trouvé' });
      }

      console.log(password, user.toObject());

      if (await bcrypt.compare(password, user.password)) {
        let updatedUser;

        if (newPassword) {
          updatedUser = await User.updateOne(
            { _id: id },
            {
              ...body,
              password: await bcrypt.hash(newPassword, await bcrypt.genSalt()),
            }
          );
        } else {
          updatedUser = await User.updateOne({ _id: id }, { ...body });
        }

        return res.status(200).json({
          status: true,
          message: { ...updatedUser, password: undefined },
        });
      }

      res.status(401).json({ status: false, message: 'action non authorisé' });
    } catch (e) {
      console.log(e);
      res.json({ status: false, message: e.message });
    }
  }
}

export default UserController;

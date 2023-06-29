// eslint-disable-next-line no-unused-vars
import express from 'express';
import { verifyToken } from '../utils/token';
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const withUser = (req, _, next) => {
  const token = req.cookies.token;

  if (verifyToken(token)) {
  }
};

export default withUser;

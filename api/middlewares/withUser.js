// eslint-disable-next-line no-unused-vars
import express from 'express';
import { verifyToken } from '../utils/token.js';
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const withUser = (req, res, next) => {
  const token = req.cookies.token;
  const verifiedToken = verifyToken(token);

  if (verifiedToken) {
    req.user = verifiedToken;
  } else {
    return res.redirect('/login');
  }
  next();
};

export default withUser;

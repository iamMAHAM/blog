/* eslint-disable no-undef */
import { connect } from 'mongoose';
import { inProduction } from './env.js';

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) throw new Error('env variables : MONGO_URI is required');
  await connect(MONGO_URI, {
    dbName: inProduction ? 'blog' : 'test_blog',
  });
};

import { Request } from 'express';

declare module 'express' {
  interface Request {
    auth: {
      _id: string;
      fullname: string;
      password: string;
      email: string;
      comments: string[];
      posts: string[];
      messages: string[];
      role: 'user' | 'admin';
    };
  }
}

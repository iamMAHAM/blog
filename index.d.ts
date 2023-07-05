import type { Request } from 'express';

declare module 'express' {
  interface Request {
    user: {
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

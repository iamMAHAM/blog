import { Router } from 'express';
import PostController from '../controllers/post.js';
import withUser from '../middlewares/withUser.js';

const postRouter = Router();

postRouter.get('/:id', PostController.getPost);
postRouter.post('/', withUser, PostController.createPost);
postRouter.put('/:id', withUser, PostController.updatePost);
postRouter.delete('/:id', withUser, PostController.deletePost);

export default postRouter;

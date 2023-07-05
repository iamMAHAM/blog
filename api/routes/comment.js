import { Router } from 'express';
import { CommentController } from '../controllers/comment.js';
import withUser from '../middlewares/withUser.js';

const commentRouter = Router();

commentRouter.post('/:postId', withUser, CommentController.addComment);

commentRouter.put('/:postId', withUser, CommentController.updateComment);

commentRouter.delete('/:postId', withUser, CommentController.deleteComment);
export default commentRouter;

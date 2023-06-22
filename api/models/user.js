import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  fullname: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  comments: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
    default: [],
  },
  posts: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'post',
      },
    ],
    default: [],
  },
  messages: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'message',
      },
    ],
    default: [],
  },
});

export default model('user', userSchema);

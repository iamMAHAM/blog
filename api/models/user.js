import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  fullname: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  role: {
    type: String,
    required: false,
    default: 'user',
  },
});

export default model('user', userSchema);

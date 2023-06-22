import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  types: {
    type: String,
    required: true,
  },
});

export default model('message', messageSchema);

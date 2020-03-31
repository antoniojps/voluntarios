import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema
import validator from 'validator';
import { paginate as mongoosePaginate } from 'mongoose-paginate-v2'

const MessageSchema = mongoose.Schema({
  to: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    trim: true,
    required: true,
  },
})

MessageSchema.set('timestamps', true)

// instance
MessageSchema.methods = {

}

// model
MessageSchema.statics = {
  pagination: mongoosePaginate,
}

// `populate()` after saving. Useful for sending populated data back to the client in an
// update API endpoint
MessageSchema.post('save', function(doc, next) {
  doc.populate('to').execPopulate().then(function() {
    next();
  });
});

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)

export default Message

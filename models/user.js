import mongoose from 'mongoose';
import validator from 'validator';
import Category from './category'
const { ObjectId } = mongoose.Schema
import { UserInputError } from 'apollo-server-micro';

// USER
// schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  admin: {
    type: Boolean,
    sparce: true,
  },
  moderator: {
    type: Boolean,
    sparce: true,
  },
  verified: {
    type: Boolean,
    sparce: true,
  },
  verifiedAt: {
    type: Date,
    sparce: true,
  },
  verificationToken: {
    type: String,
    space: true,
  },
  verificationTokenSentAt: {
    type: Date,
    sparce: true,
  },
  categories: {
    type: [
      {
        type: ObjectId,
        required: true,
        _id: false,
      },
    ],
    sparce: true,
  },
  locations: {
    type: [
      {
        type: ObjectId,
        required: true,
        _id: false,
      },
    ],
    sparce: true,
  },
});

// model methods
UserSchema.statics = {
  findByEmail(email) {
    return User.findOne({
      email,
    });
  },
  async createUser(newUser) {
    const categoriesIds = newUser.categories
    const categoriesInDB = await Category.find({ '_id': { $in: categoriesIds } })

    const isValid = categoriesInDB.length === categoriesIds.length
    if (!isValid) throw new UserInputError(`Invalid categories`)
    const user = new User(newUser);
    return user.save();
  },
};

// instance methods
UserSchema.methods = {
  toObj() {
    const userObj = this.toObject();
    return userObj;
  },
  verify() {
    const user = this
    user.verified = true
    user.verificationToken = null
    user.verifiedAt = Date.now()
    return user
  },
};

// model
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

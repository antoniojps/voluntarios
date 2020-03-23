import mongoose from 'mongoose';
import validator from 'validator';
import Category from './category'
const { ObjectId } = mongoose.Schema
import { UserInputError } from 'apollo-server-micro';
import { paginate } from '../apollo/utils/filters'
import { paginate as mongoosePaginate } from 'mongoose-paginate-v2'

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
  name: {
    type: String,
    trim: true,
    sparce: true,
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
        name: {
          type: String,
          required: true,
        },
        geolocation: {
          type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true,
          },
          coordinates: {
            type: [Number],
            required: true,
          },
        },
      },
    ],
    sparce: true,
  },
  job: {
    type: String,
    trim: true,
    sparce: true,
  },
});

UserSchema.set('timestamps', true)

// model methods
UserSchema.statics = {
  findByEmail(email) {
    return User.findOne({
      email,
    });
  },
  async createUser(newUser) {
    const categoriesIds = newUser.categories
    if (categoriesIds && categoriesIds.length > 0) {
      const categoriesInDB = await Category.find({ '_id': { $in: categoriesIds } })
      const isValid = categoriesInDB.length === categoriesIds.length
      if (!isValid) throw new UserInputError(`Invalid categories`)
    }
    const user = new User(newUser);
    return user.save();
  },
  pagination: mongoosePaginate,
  async searchByFilters({ input, pagination = {} }) {
    const { name, geolocation, categories, orderBy } = input
    const distanceKm = 30
    const radiusOfEarthKm = 6378.1
    let query = {}
    let sort = {}

    if (name) {
      query.name = { $regex: name, $options: 'i' }
    }
    if (geolocation && geolocation.long && geolocation.lat) {
      query["locations.geolocation"] = {
        $geoWithin: {
          $centerSphere: [
            [geolocation.long, geolocation.lat],
            distanceKm / radiusOfEarthKm,
          ],
        },
      }
    }
    if (categories && categories.length > 0) {
      query.categories = categories.map(id => mongoose.Types.ObjectId(id))
    }
    if (orderBy && orderBy.sort && orderBy.field) {
      sort = { [orderBy.field]: orderBy.sort }
    }
    return paginate(this, query, pagination, sort)
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
UserSchema.index({"locations.geolocation": '2dsphere'});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

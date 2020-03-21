import mongoose from 'mongoose'
import {paginate} from '../graphql/utils/filters'

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 35,
  },
  color: {
    type: String,
    trim: true,
    required: true,
  },
})

CategorySchema.set('timestamps', true)

// instance
CategorySchema.methods = {

}

// model
CategorySchema.statics = {
  async searchByName ({ search, pagination = {} }) {
    const { after } = pagination
    let query = {
      name: { $regex: search, $options: 'i' },
    }
    if (after) query.createdAt = { $gt: after }
    return paginate(this, query, pagination)
  },
}

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)

export default Category

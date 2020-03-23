import mongoose from 'mongoose'

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
}

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)

export default Category

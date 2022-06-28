import mongoose from 'mongoose';

import categorySchema from '../schemas/category.schema';

const Category = mongoose.model('Category', categorySchema);

export default Category;

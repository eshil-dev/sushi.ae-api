import mongoose from 'mongoose';

import menuSchema from '../schemas/menu.schema.js';

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;

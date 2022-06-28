import mongoose from 'mongoose';

import menuSchema from '../schemas/menu.schema';

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;

import express from 'express';
import passport from 'passport';

import Category from '../models/menu/category.model';
import Menu from '../models/menu/menu.model';

const menuControllerRouter = express.Router();

menuControllerRouter.use(passport.authenticate('jwt', { session: false }));

menuControllerRouter.get('/category', async (req, res) => {
    const result = await Category.find({});
    res.send(result);
});

menuControllerRouter.post('/category', async (req, res) => {
    const { name } = req.body;
    const category = Category({
        name: name
    });
    const result = await category.save();
    res.send({message: result});
});


menuControllerRouter.post('/', async (req, res) => {
    const { name, description, imageUrl, price, category } = req.body;
    const menu = Menu({
        name: name,
        description: description,
        imageUrl: imageUrl,
        price: price,
        category: category
    });
    const result = await menu.save();
    res.send(result);
});

menuControllerRouter.get('/', async (req, res) => {
    const result = await Menu.find().populate('category');
    res.send(result);
});

export default menuControllerRouter;
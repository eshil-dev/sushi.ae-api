import Category from '../models/menu/category.model';
import Menu from '../models/menu/menu.model';

export const listCategory = async (req, res) => {
    const result = await Category.find({});
    res.send(result);
}

export const postCategory = async (req, res) => {
    const { name } = req.body;
    const category = Category({
        name: name
    });
    const result = await category.save();
    res.send({message: result});
}

export const postMenu =  async (req, res) => {
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
};

export const listMenu = async (req, res) => {
    const result = await Menu.find().populate('category');
    res.send(result);
}
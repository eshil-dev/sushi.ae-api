import Category from '../models/menu/category.model';
import Menu from '../models/menu/menu.model';

import { uploadToS3 } from '../utils/imageService';

export const listCategory = async (req, res) => {
  try {
    const result = await Category.find({});
    return res.send(result);
  } catch (err) {
    return res.send(err);
  }

}

export const postCategory = async (req, res) => {
  const { name, description, imageName, imageBase64, available } = req.body;
  try {
    const imageUrl = await uploadToS3(imageName, imageBase64)
    const category = Category({ name, description, imageUrl, available });
    const result = await category.save();
    return res.send({ message: result });
  } catch (err) {
    return res.send(err);
  }
}

export const updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.send({ message: 'Category not found!' });
    }
    await category.update(req.body);
    res.send({ id: category._id, ...req.body })
  } catch (err) {
    res.send({ message: err.message });
  }
}

export const deleteCategory = async (req, res) => {
  const catId = req.params.id;
  try {
    let category = await Category.findById(catId);
    if (!category) {
      res.send({ message: 'Category not found to delete' });
    }
    await Category.findByIdAndDelete(catId)
    res.send({ message: 'Category Deleted successfully.' });

  } catch (err) {
    res.send({ message: err.message });
  }
}

export const postMenu = async (req, res) => {
  const { name, description, price, imageName, imageBase64, currency, available, category } = req.body;
  try {
    const imageURL = await uploadToS3(imageName, imageBase64)
    const menu = Menu({
      name: name,
      description: description,
      imageUrl: imageURL,
      price: price,
      currency: currency,
      available: available,
      category: category
    });
    const result = await menu.save();
    return res.send(result);
  } catch (err) {
    return res.send(err);
  }

};

export const listMenu = async (req, res) => {
  const result = await Menu.find().populate('category');
  return res.status(200).send(result);
}

export const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.send({ message: 'Menu with the provided ID is not found' });
    }
    await menu.update(req.body);
    return res.send({ id: menu._id, ...req.body })
  } catch (err) {
    return res.send(err);
  }
}

export const deleteMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.send({ message: 'Menu with the provided ID is not found.' });
    }
    await Menu.findByIdAndDelete(menuId);
    return res.send({ message: 'Menu is succesfully deleted.' });
  } catch (err) {
    return res.send(err)
  }
}
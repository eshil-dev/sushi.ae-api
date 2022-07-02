import Menu from '../models/menu/menu.model.js';
import { uploadToS3 } from '../utils/imageService.js';

export const postMenu = async (req, res) => {
  const {
    name,
    description,
    price,
    discount,
    imageName,
    imageBase64,
    currency,
    available,
    category
  } = req.body;

  try {
    let imageURL = '';
    if (imageName && imageBase64)
      imageURL = await uploadToS3(imageName, imageBase64)
    const menu = Menu({
      name: name,
      description: description,
      imageUrl: imageURL,
      price: price,
      discount: discount,
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
  const id = req.params.id;
  const {
    name,
    description,
    category,
    imageName,
    base64Image,
    price,
    discount,
    currency,
    available
  } = req.body;

  try {

    const menu = await Menu.findById(id);
    if (!menu) {
      return res.send({ message: 'Menu with the provided ID is not found' });
    } else {

      if (imageName && base64Image) {
        const s3ImageURL = await uploadToS3(imageName, base64Image);
        const result = await Menu.findByIdAndUpdate(id, {
          $set: {
            name: name,
            description: description,
            imageUrl: s3ImageURL,
            price: price,
            discount: discount,
            currency: currency,
            category: category,
            available: available
          }
        }, { new: true });
        return res.send(result);
      } else {
        const result = await Menu.findByIdAndUpdate(id, {
          $set: {
            name: name,
            description: description,
            price: price,
            discount: discount,
            currency: currency,
            category: category,
            available: available
          }
        }, { new: true });
        return res.send(result);
      }
    }
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
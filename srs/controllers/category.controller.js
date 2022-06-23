import Category from '../models/menu/category.model';
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

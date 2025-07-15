import productSchema from '../models/productModel.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ESM __dirname reconstruction
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// ─────── Controller Functions ───────

// GET all products
async function getAllProducts(req, res) {
  try {
    const products = await productSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET product by ID (admin only)
async function getProductById(req, res) {
  const userRole = req.user?.role;
  if (userRole !== 'admin') {
    return res.status(401).json({ message: 'Access Denied: Admin Only' });
  }

  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Product ID is required.' });
  }

  try {
    const product = await productSchema.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// CREATE product (admin only)
async function createProduct(req, res) {
  const userRole = req.user?.role;
  if (userRole !== 'admin') {
    return res.status(401).json({ message: 'Access Denied: Admin Only' });
  }

  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const product = {
        name: req.body.name,
        price: req.body.price,
        image: req.file?.filename || null,
        description: req.body.description,
        createdAt: new Date()
      };
      await productSchema.create(product);
      res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}

// UPDATE product (admin only)
async function updateProduct(req, res) {
  const userRole = req.user?.role;
  if (userRole !== 'admin') {
    return res.status(401).json({ message: 'Access Denied: Admin Only' });
  }

  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'Product ID is required.' });

  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const existingProduct = await productSchema.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      const updateData = {
        ...req.body,
        updatedAt: new Date()
      };

      if (req.file) {
        if (existingProduct.image) {
          const oldImagePath = path.join(uploadDir, path.basename(existingProduct.image));
          fs.promises.unlink(oldImagePath).catch(err => console.error(err.message));
        }
        updateData.image = req.file.filename;
      }

      const updatedProduct = await productSchema.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}

// DELETE product (admin only)
async function deleteProduct(req, res) {
  const userRole = req.user?.role;
  if (userRole !== 'admin') {
    return res.status(401).json({ message: 'Access Denied: Admin Only' });
  }

  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'Product ID is required.' });

  try {
    const existingProduct = await productSchema.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    if (existingProduct.image) {
      const filePath = path.join(uploadDir, path.basename(existingProduct.image));
      fs.promises.unlink(filePath).catch(err => console.error('Error deleting file:', err.message));
    }

    await productSchema.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ─────── Export ───────
export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

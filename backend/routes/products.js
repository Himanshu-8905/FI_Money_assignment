const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// --- Add a new product: POST /api/products ---
router.post('/', auth, async (req, res) => {
  const { name, type, sku, image_url, description, quantity, price } = req.body;
  if (!name || !type || !sku || quantity === undefined || price === undefined) {
    return res.status(400).json({ message: 'Missing required product fields.' });
  }
  try {
    const newProduct = new Product({
      ...req.body,
      user: req.user.userId
    });
    const savedProduct = await newProduct.save();
    res.status(201).json({ product_id: savedProduct._id, message: 'Product added successfully' });
  } catch (error) {
    if (error.code === 11000) {
        return res.status(409).json({ message: 'Product with this SKU already exists.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- Update product quantity: PUT /api/products/:id/quantity ---
router.put('/:id/quantity', auth, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity === undefined || typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({ message: 'A valid, non-negative quantity is required.' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    if (product.user.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'User not authorized to update this product.' });
    }
    product.quantity = quantity;
    const updatedProduct = await product.save();
    res.json({ message: 'Product quantity updated successfully.', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- Get all products: GET /api/products ---
router.get('/', auth, async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find({ user: req.user.userId })
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit);
        const totalProducts = await Product.countDocuments({ user: req.user.userId });

        res.json({
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// --- Delete a product: DELETE /api/products/:id ---
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Ensure the user owns the product before deleting
    if (product.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'User not authorized to delete this product.' });
    }

    await Product.findByIdAndDelete(id);

    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;

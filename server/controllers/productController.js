const productSchema = require("../model/productModel");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// get all products from the database
async function getAllProducts(req, res) {
    try {
        const products = await productSchema.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get product by id
async function getProductById(req, res){
    const id = req.params.id;
    if(!id) {
        return res.status(400).json({message: "Product Id is required."})
    }
    try {
        const product = await productSchema.findById(id);
        if(!product) {
            return res.status(404).json({ message: "Product by that id is not found."});
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// create products
async function createProduct(req, res){
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const product = {
                name: req.body.name,
                price: req.body.price,
                image: req.file ? req.file.filename : null,
                description: req.body.description,
                createdAt: Date.now()
            };
            await productSchema.create(product);
            res.status(201).json({ message: "Product created successfully"})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })
}

// update product
async function updateProduct(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "Product id is required"});
    }
    try {
        const product = await productSchema.findByIdAndUpdate(id, req.body, { new: true });
        if(!product) {
            return res.status(404).json({ message: "Product not found"});
        }
        res.status(200).json({ message: "Product updated Successfully."});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteProduct(req, res) {
    const id = req.params.id;
    if(!id) {
        return res.status(400).json({ message: "Product id is required."})
    }
    try {
        const existingProduct = await productSchema.findById(id);
        if(!existingProduct) {
            return res.status(404).json({ message: "Product not found"});
        }
        if (existingProduct.image) {
            const filePath = path.join(uploadDir, path.basename(existingProduct.image));
            fs.promises.unlink(filePath)
                .then(() => console.log('File deleted successfully'))
                .catch(error => console.error('Error deleting file:', error.message));
        }
        const product = await productSchema.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({ message: "Product not found."})
        }
        
        res.status(200).json({ message: "Product deleted successfully." })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
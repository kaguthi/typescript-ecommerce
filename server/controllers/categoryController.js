import categorySchema from '../models/categoryModel.js';
async function getAllCategory(req, res) {
    try {
        const category = await categorySchema.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get category by id
async function getCategoryById(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "No id found"});
    }
    try {
        const category = await categorySchema.findById(id);
        if (!category) {
            return res.json(404).json({ message: "No category found by that provided id"});
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// adding catogery to the database
async function createCategory(req, res) {
    try {
        await categorySchema.create({ name: req.body.name, createdAt: Date.now() });
        res.status(201).json({ message: "Category created successfully."});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// updating category by Id
async function updateCategory(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message : "No id found"});
    }
    try {
        const category = await categorySchema.findByIdAndUpdate(id);
        if (!category) {
            return res.status(404).json({ message : "No category found by that id"});
        }
        res.status(200).json({ message: "Category updated successfully."})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// delete category by id
async function deleteCategory(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "No Id found."});
    }
    try {
        const category = await categorySchema.findByIdAndDelete(id);
        if(!category) {
            return res.status(404).json({ message: "No category found by that id"});
        }
        res.status(200).json({ message: "Category deleted successfully."});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory };
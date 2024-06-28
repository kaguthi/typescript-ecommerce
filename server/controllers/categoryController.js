const categorySchema = require("../model/categoryModel");

// get all categorys

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
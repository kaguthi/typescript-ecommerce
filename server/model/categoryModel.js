const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: Date
});

module.exports = mongoose.model("Category", categorySchema);
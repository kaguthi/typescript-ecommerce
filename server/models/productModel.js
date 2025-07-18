import mongoose from 'mongoose';
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    publicId: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

export default mongoose.model('Product', productSchema);
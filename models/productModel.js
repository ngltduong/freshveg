import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        trim: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    images:{
        type: Array,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    checked:{
        type: Boolean,
        default: true,
    },
    inStock:{
        type: Number,
        default: 0,
    },
    sold:{
        type: Number,
        default: 0,
    },
    slug:{
        type: String,
    }
}, {
    timestamps: true
})

let DataSet = mongoose.models.product || mongoose.model('product', productSchema)

export default DataSet
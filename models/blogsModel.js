import mongoose from "mongoose"

const blogsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    summary:{
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
},{
    timestamps: true
})

let DataSet = mongoose.models.blogs || mongoose.model('blogs',blogsSchema)

export default DataSet

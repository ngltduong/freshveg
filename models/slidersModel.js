import mongoose from "mongoose"

const slidersChema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    }
})

let DataSet = mongoose.models.slides || mongoose.model('slides', slidersChema)

export default DataSet
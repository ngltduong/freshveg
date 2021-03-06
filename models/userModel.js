import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    },
    root:{
        type: Boolean,
        default: false
    },
    avatar:{
        type: String,
        default: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
    }
}, {
    timestamps: true
})

let DataSet = mongoose.models.user || mongoose.model('user', userSchema)

export default DataSet
import mongoose from 'mongoose'

const connectDB = () => {
    if(mongoose.connections[0].readyState){
        console.log('Already connected.')
        return
    }
    const option = {
        useNewUrlParser: true, 

        useUnifiedTopology: true 
    }
    mongoose.connect(process.env.MONGODB_URL, option,
        err => {
            if(err) throw err
            console.log('Connected to mongoDB.')
        })
}

export default connectDB
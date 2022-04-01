import connectDB from "../../../utils/connectDB";
import Blogs from "../../../models/blogsModel"

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getBlogs(req, res)
            break
    }
}

const getBlogs = async (req, res) => {
    try{
        const blogs = await Blogs.find()
        
        res.json({blogs})

    } catch(err){
        return res.status(500).json({err: err.message})
    }
}
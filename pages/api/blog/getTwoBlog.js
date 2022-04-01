import connectDB from "../../../utils/connectDB";
import Blogs from "../../../models/blogsModel"

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getTwoBlog(req, res)
            break
    }
}

const getTwoBlog = async (req, res) => {
    try{
        
        const blog = await Blogs.aggregate([{$sample: {size: 2}}])

        if(!blog)   
            return res.status(400).json({err: "This blog does not exist"})
        
        res.json({blog})

    } catch(err){
        return res.status(500).json({err: err.message})
    }
}
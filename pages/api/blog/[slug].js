import connectDB from "../../../utils/connectDB";
import Blogs from "../../../models/blogsModel"

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getBlog(req, res)
            break
    }
}

const getBlog = async (req, res) => {
    try{
        const { slug } = req.query
        
        const blog = await Blogs.findOne({slug})
        if(!blog)   
            return res.status(400).json({err: "This blog does not exist"})
        
        res.json({blog})

    } catch(err){
        return res.status(500).json({err: err.message})
    }
}